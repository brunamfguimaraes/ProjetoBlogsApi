function error(err, req, res, _next) {
  if (err.code) {
    return res.status(err.code).json({ message: err.message });
  }
}

module.exports = error;