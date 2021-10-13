const { User } = require('../models');

const userController = async (req, _res) => {
  const { body } = req;
  return User.create(body);
};

module.exports = userController;
