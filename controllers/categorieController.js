// const jwt = require('jsonwebtoken');
const { Categorie } = require('../models');

// const OK = 200;
const CREATED = 201;
// const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

// const secret = 'mySuperPassword';

// const jwtConfig = {
//   expiresIn: '15d',
//   algorithm: 'HS256',
// };

const createCategorie = async (req, res) => {
  const { dataValues: { name } } = await Categorie.create(req.body);

  if (!name) {
    return res.status(INTERNAL_SERVER_ERROR);
  }
  
  return res.status(CREATED).json({ name });
};

// const findAllUsers = async (_req, res) => {
//   const allUsers = await User.findAll();
//   if (!allUsers) {
//     return res.status(INTERNAL_SERVER_ERROR);
//   }

//   return res.status(OK).json(allUsers);
// };

// const findUserById = async (req, res) => {
//   const { id } = req.params;
//   const userById = await User.findByPk(id);

//   if (!userById) {
//     return res.status(NOT_FOUND).json({ message: 'User does not exist' });
//   }

//   return res.status(OK).json(userById);
// };

// module.exports = { createUser, findAllUsers, findUserById };
module.exports = { createCategorie };
