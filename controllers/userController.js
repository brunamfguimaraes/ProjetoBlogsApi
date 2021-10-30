const jwt = require('jsonwebtoken');
const { validateCreate, validateFindUser, validateFindById } = require('../services/userService');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const userCreate = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const create = await validateCreate({ displayName, email, password, image });
  const { code, message } = create;
  if (message) {
    return res.status(code).json({ message });
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: create }, secret, jwtConfig);
  return res.status(201).json({ token });
};

const findUser = async (req, res) => {
  const find = await validateFindUser();
  const noPassword = find.map(
  ({ id, displayName, email, image }) => ({ id, displayName, email, image }),
  );
  return res.status(200).json(noPassword);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const byId = await validateFindById(id);
  const { code, message } = byId;
  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(200).json(byId);
};

module.exports = {
  userCreate,
  findUser,
  findById,
};