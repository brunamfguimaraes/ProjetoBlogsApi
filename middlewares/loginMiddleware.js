const required = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined && password) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (email && password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  req.email = email;
  
  return next();
};
const isEmpty = (req, res, next) => {
  const { email, password } = req.body;
  if (email.length === 0) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password.length === 0) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  return next();
};

module.exports = {
  required,
  isEmpty,
};
