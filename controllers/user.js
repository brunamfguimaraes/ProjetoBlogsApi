const { getUserByEmail, createUser } = require('../services/user');

// const status400 = 400;
const status201 = 201;
const status409 = 409;

const postUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
  return res.status(status409).json({ message: 'User already registered' });
  }
  try {
  const result = await createUser({ displayName, email, password, image });
  console.log(result);
  return res.status(status201).json(result);
  } catch (err) {
  console.log(err.message);
  return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  postUser,
};