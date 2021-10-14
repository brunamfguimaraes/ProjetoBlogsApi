const userValidations = require('../services/userService');

const userCreate = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const create = await userValidations;
};

module.exports = {
  userCreate,
};