const errorMiddleware = (err, _req, res, _next) => {
  if (err.isError) {
    return res.status(err.code).json({ message: err.message });
  }
  console.log(err);
};

module.exports = errorMiddleware;