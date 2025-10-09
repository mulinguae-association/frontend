// Utility helpers for video URL resolution and Cloudinary transformations
export function getTargetPx(deviceWidth = 320, dpr = 1) {
  const safeWidth = Math.max(deviceWidth || 0, 320);
  return Math.round(safeWidth * (dpr || 1));
}

export function chooseBreakpoint(
  targetPx,
  breakpoints = [480, 720, 1080, 1440, 1920, 2560]
) {
  if (!Array.isArray(breakpoints) || breakpoints.length === 0) return targetPx;
  const chosen = breakpoints.find((b) => b >= targetPx);
  return chosen || breakpoints[breakpoints.length - 1];
}

export function buildCloudinaryUrl(origUrl, width) {
  if (!origUrl || !width) return origUrl;
  try {
    const url = new URL(origUrl);
    const parts = url.pathname.split("/");
    const uploadIndex = parts.findIndex((p) => p === "upload");
    if (uploadIndex === -1) return origUrl;

    const tail = parts.slice(uploadIndex + 1).join("/");
    const vMatch = tail.match(/\/v\d+/);
    const restStart = vMatch ? tail.indexOf(vMatch[0]) : -1;
    const rest = restStart >= 0 ? tail.substring(restStart) : tail;
    const newTransform = `c_scale,w_${width},f_auto,q_auto`;
    const newPath =
      parts.slice(0, uploadIndex + 1).join("/") +
      "/" +
      newTransform +
      "/" +
      rest;
    url.pathname = newPath;
    return url.toString();
  } catch (e) {
    return origUrl;
  }
}

export function resolveForDevice(
  origUrl,
  deviceWidth = 320,
  dpr = 1,
  breakpoints
) {
  const targetPx = getTargetPx(deviceWidth, dpr);
  const chosen = chooseBreakpoint(targetPx, breakpoints);
  return buildCloudinaryUrl(origUrl, chosen);
}
