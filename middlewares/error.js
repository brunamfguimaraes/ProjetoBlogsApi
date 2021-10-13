module.exports = (error, _req, res, _next) => {
  if (error.isJoi) {
    return res.status(400).json({ message: error.details[0].message });
  }
  console.log(error);
  return res.status(error.status).json({ message: error.message });
};
