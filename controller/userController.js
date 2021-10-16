const jwt = require('jsonwebtoken');
const { createUserService, loginUserService, getUserByIdService,
  getAllUsersService } = require('../service/userService');
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

const loginUser = async (req, res) => {
  const { body } = req; 
  try {
    const user = await loginUserService(body);

    console.log(user, 'user');

    if (user.message) return res.status(400).json({ message: user.message });

    // const token = jwt.sign({ 
    //   payload: { email, password, userId: _id, role } }, segredo, jwtConfig);
    
   const token = jwt.sign({ 
     payload: { body, userId: user } }, segredo, jwtConfig);
  
    return res.status(200).json({ token });
    } catch (err) { 
      const { message } = err;
      return res.status(400).json({ message });
    }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await getAllUsersService();
  
    return res.status(200).json(user);
    } catch (err) { 
      const { message } = err;
      return res.status(400).json({ message });
    }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    console.log(user);
    if (user.message) return res.status(404).json({ message: user.message });
    return res.status(200).json(user);
  } catch (err) {
    const { message } = err;
    return res.status(400).json({ message });
  }
};
module.exports = { createUser, loginUser, getAllUsers, getUserById };