import { Readable } from "stream";

export const config = {
  runtime: "nodejs",
};

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "upgrade",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
]);

const FORWARD_EXCLUDED = new Set(["host", "content-length"]);

const readBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

export default async function handler(req, res) {
  const baseUrl = process.env.BACKEND_URL;
  if (!baseUrl) {
    res.status(502).json({ error: "BACKEND_URL is not configured" });
    return;
  }

  const target = baseUrl.replace(/\/+$/, "") + req.url;

  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (value !== undefined && !FORWARD_EXCLUDED.has(key)) {
      headers[key] = value;
    }
  }

  const hasBody = !["GET", "HEAD"].includes(req.method || "");

  try {
    const upstream = await fetch(target, {
      method: req.method,
      headers,
      body: hasBody ? await readBody(req) : undefined,
      redirect: "manual",
    });

    res.statusCode = upstream.status;
    upstream.headers.forEach((value, key) => {
      if (!HOP_BY_HOP.has(key.toLowerCase())) {
        const setCookieValues = upstream.headers.getSetCookie
          ? upstream.headers.getSetCookie()
          : null;
        if (key.toLowerCase() === "set-cookie" && setCookieValues) {
          res.setHeader("set-cookie", setCookieValues);
        } else {
          res.setHeader(key, value);
        }
      }
    });

    if (upstream.body) {
      Readable.fromWeb(upstream.body).pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    res.status(502).json({ error: "Error proxying request to backend" });
  }
}