// HTTP status codes
const HTTP = {
  BadRequest: 400,
};

// Validação do nome
const validateDisplayName = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(HTTP.BadRequest).json(
      { message: '"displayName" length must be at least 8 characters long' },
    );
  }

  return next();
};

// Validação do email
const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) return res.status(HTTP.BadRequest).json({ message: '"email" is required' });

  if (!EMAIL_REGEX.test(email)) {
    return res.status(HTTP.BadRequest).json({ message: '"email" must be a valid email' });
  }

  return next();
};

// Validação da senha
const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(HTTP.BadRequest).json({ message: '"password" is required' });
  }

  if (password.length !== 6) {
    return res.status(HTTP.BadRequest).json(
      { message: '"password" length must be 6 characters long' },
    );
  }

  next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
}; 