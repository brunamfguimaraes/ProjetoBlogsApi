const { newToken } = require('../auth/createToken');

const login = async (req, res) => {
  const { body } = req;
  const id = req.infos;
  const token = await newToken({ ...body, id });
  res.status(200).json({ token });
};

module.exports = {
  login,
};