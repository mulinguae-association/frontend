export default function handler(req, res) {
  res.status(200).json({ ok: true, id: req.query.id, url: req.url });
}