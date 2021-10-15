const { generateToken } = require('../Token/creatToke');

const login = async (req, res) => {
  const { email } = req.body;
  const token = await generateToken(email);
  res.status(200).json({ token });
};

module.exports = { login };