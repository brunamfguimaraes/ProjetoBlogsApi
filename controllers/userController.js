const CODE = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const secret = 'seusecretdetoken';

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const newUser = await User.create({ displayName, email, password, image });

    const token = jwt.sign({ data: newUser }, secret, jwtConfig);

    return res.status(CODE.CREATED).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(CODE.CONFLICT).json({ message: 'User already registered' });
  }
};

const getAll = async (_req, res) => {
  try {
   const users = await User.findAll({
     attributes: { exclude: ['password'] },
   });
   return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(CODE.CONFLICT).json({ message: 'unexpected server problem' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    
    if (!user) return res.status(CODE.NOT_FOUND).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(CODE.CONFLICT).json({ message: 'unexpected server problem' });
  }
};

module.exports = {
  createUser,
  getAll,
  getById,
};
