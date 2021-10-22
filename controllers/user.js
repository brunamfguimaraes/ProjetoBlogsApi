const { jwtSign } = require('../middlewares/jwt');
const { verifyDisplayName, verifyEmail } = require('../middlewares/user');
const { getUserByEmail, createUser } = require('../services/user');

const status400 = 400;
const status201 = 201;
const status409 = 409;

const postUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  if (!verifyDisplayName(displayName)) {
    return res.status(status400)
    .json({ message: '"displayName" length must be at least 8 characters long' }); 
}
  if (!email) {
    return res.status(status400).json({ message: '"email" is required' });
  }
  if (!verifyEmail(email)) {
 return res.status(status400).json({ message: '"email" must be a valid email' }); 
}
  if (!password) {
  return res.status(status400).json({ message: '"password" is required' });
}
  if (password.length !== 6) {
    return res.status(status400).json(
  { message: '"password" length must be 6 characters long' },
    ); 
}
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