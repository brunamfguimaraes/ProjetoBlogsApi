const { getUserByEmail, createUser, getUsers } = require('../services/user');
const { jwtSign, jwtVerify } = require('../middlewares/jwt');

const status409 = 409;
const status401 = 401;
const status400 = 400;
const status201 = 201;
const status200 = 200;

const postUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
  return res.status(status409).json({ message: 'User already registered' });
  }
  try {
  const result = await createUser({ displayName, email, password, image });
  return res.status(status201).json(result);
  } catch (err) {
  return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(status400).json({ message: 'Invalid fields' });
  }
  try {
    const token = jwtSign({ email, password });
    return res.status(status200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getAllUsers = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(status401).json({ message: 'Token not found' });
  }
  const jwtResult = jwtVerify(token);
  if (jwtResult.message) {
    return res.status(status401).json({ message: 'Expired or invalid token' });
  }
  try {
    const result = await getUsers();
    return res.status(status200).json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};
module.exports = {
  postUser,
  userLogin,
  getAllUsers,
};