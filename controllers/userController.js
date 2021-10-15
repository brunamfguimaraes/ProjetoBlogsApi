const { validateCreate } = require('../services/userService');

const userCreate = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const create = await validateCreate({ displayName, email, password, image });
  res.status(200).json(create);
};

module.exports = {
  userCreate,
};