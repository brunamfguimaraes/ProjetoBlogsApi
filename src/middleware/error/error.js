const middlewareError = (error, _req, res, _next) => {
  if (error.isJoi) {
    return res.status(400).json({ message: error.message });
  }
  if (error.isError) {
    return res.status(error.code).json({ message: error.message });
  }
};

module.exports = middlewareError;
