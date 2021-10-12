const UserService = require('../services/users.service');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await UserService.createUser(
    displayName,
    email,
    password,
    image,
  );
  return res.status(201).json(newUser);
};

module.exports = { createUser };
