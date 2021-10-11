const middlewareError = (error, _req, res, _next) => {
  console.log(error);
  if (error.isJoi) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (error.isError) {
    return res.status(error.code).json({ message: error.message });
  }
};

module.exports = middlewareError;
