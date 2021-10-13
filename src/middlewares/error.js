const checkErrorType = (error) => {
  switch (true) {
    case error.isJoi:
      return { code: 400, message: error.details[0].message };
    case error.userRegistered:
      return { code: 409, message: error.message };

    default:
      return { code: 500, message: 'Server error' };
  }
};

module.exports = (err, _req, res, next) => {
  const { code, message } = checkErrorType(err);

  res.status(code).json({ message });

  next();
};
