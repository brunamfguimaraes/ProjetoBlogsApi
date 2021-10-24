const jwt = require('jsonwebtoken');
const { validateCreate, validateFindUser } = require('../services/userService');
require('dotenv').config();

// const secret = 'seusecretdetoken';

const userCreate = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const create = await validateCreate({ displayName, email, password, image });
  const { code, message } = create;
  if (message) {
    res.status(code).json({ message });
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: create }, process.env.JWT_SECRET, jwtConfig);
  res.status(201).json({ token });
};

const findUser = async (req, res) => {
  const find = await validateFindUser();
  const noPassword = find.map(
  ({ id, displayName, email, image }) => ({ id, displayName, email, image }),
  );
  res.status(200).json(noPassword);
};

module.exports = {
  userCreate,
  findUser,
};