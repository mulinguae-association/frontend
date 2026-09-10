export default function handler(req, res) {
  res.status(200).json({ probe: "probe123-deploy-check", url: req.url });
}