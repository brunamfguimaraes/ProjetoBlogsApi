const { getUserByEmail, createUser } = require('../services/user');
const { jwtSign } = require('../middlewares/jwt');

const status409 = 409;
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

module.exports = {
  postUser,
  userLogin,
};