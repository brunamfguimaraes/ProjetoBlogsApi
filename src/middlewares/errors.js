module.exports = (err, req, res, _next) => {
  console.log(err);
  if (err.isJoi) return res.status(400).json({ message: err.details[0].message });
  if (err.code) return res.status(err.code).json({ message: err.message });
  return res.status(500).json({ message: err.message });
};
