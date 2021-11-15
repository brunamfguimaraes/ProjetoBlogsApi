require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const fields = { displayName, email, password, image };

    const response = await UserService.createUser(fields);

    if (response.message && response.conflict) {
      return res.status(409).json(response);
    }

    if (response.message) {
      return res.status(400).json(response);
    }

    return res.status(201).json({ token: response });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await UserService.getUsers();

    return res.status(200).json({ token: response });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

const secret = 'naruto123';

const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await UserService.userLogin(email, password);

    if (response.message) {
      return res.status(400).json(response);
    }

    const { id, displayName, image } = response;
    const payload = { id, displayName, email, image };
    const token = jwt.sign(payload, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  userLogin,
};
