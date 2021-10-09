const rescue = require('express-rescue');

// const secret = 'seusecretdetoken';

const login = rescue(async (req, res) => {
  const { token } = req;
  return res.status(200).json({ token });
});

module.exports = { login };
