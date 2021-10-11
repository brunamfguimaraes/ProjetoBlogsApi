const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  if (err.isError) {
    return res.status(err.code)
    .json({ message: err.message });
  }
};

module.exports = errorMiddleware;