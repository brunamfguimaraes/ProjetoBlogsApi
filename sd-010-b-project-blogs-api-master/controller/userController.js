const jwt = require('jsonwebtoken');
const { createUserService } = require('../service/userService');
require('dotenv').config();

const segredo = process.env.SECRETPASSWORD;

const jwtConfig = { 
 expiresIn: '1h',
 algorithm: 'HS256',
};

const createUser = async (req, res) => {
  const { body } = req; 
  try {
  const user = await createUserService(body);
  console.log(user.message, 'create user');
  if (user.message === 'User already registered') { 
    console.log('pão');
    return res.status(409).json({ message: user.message }); 
}
  if (user.message) return res.status(400).json({ message: user.message });
  
 const token = jwt.sign({ 
   payload: { body } }, segredo, jwtConfig);

  return res.status(201).json({ token });
  } catch (err) { 
    const { message } = err;
    return res.status(400).json({ message });
  }
};

module.exports = { createUser };