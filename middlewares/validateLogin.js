const HTTP = {
  BadRequest: 400,
};

const validateWithout = (req, res, next) => {
  const { email, password } = req.body;
  
  if (email === undefined && password) {
    return res.status(HTTP.BadRequest).json({ message: '"email" is required' });
  }

  if (email && password === undefined) {
    return res.status(HTTP.BadRequest).json({ message: '"password" is required' });
  }

  return next();
};

const validateEmpty = (req, res, next) => {
  const { email, password } = req.body;
  if (email.length === 0) {
    return res.status(HTTP.BadRequest).json({ message: '"email" is not allowed to be empty' });
  }

  if (password.length === 0) {
    return res.status(HTTP.BadRequest).json({ message: '"password" is not allowed to be empty' });
  }

  return next();
};

module.exports = {
  validateWithout,
  validateEmpty,
}; 