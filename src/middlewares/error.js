module.exports = (err, req, res, _next) => {
  console.log(err);
  if (err.isJoi) return res.status(400).json({ message: err.message });
  if (err.statusCode) return res.status(err.statusCode).json({ message: err.message });
  return res.status(500).json({ error: err });
};
