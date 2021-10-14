const checkErrorType = (error) => {
  switch (true) {
    case error.isJoi:
      return { code: 400, message: error.details[0].message };

    default:
      return { code: 500, message: error };
  }
};

module.exports = (err, _req, res, next) => {
  const { code, message } = checkErrorType(err);
  console.log(err);

  res.status(code).json({ message });

  next();
};
