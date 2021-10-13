const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegExp = /\S+@\S+\.\S+/;
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!emailRegExp.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  return next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

const validateDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({ message:
      '"displayName" length must be at least 8 characters long' });
  }
  return next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
};