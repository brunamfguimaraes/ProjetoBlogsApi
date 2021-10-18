const jwt = require('jsonwebtoken');
const { Category } = require('../models/index');
require('dotenv').config();
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const JWTToken = (email) => jwt.sign({ data: email }, JWT_SECRET, jwtConfig);

const emailVerificator = (email) => {
  const emailRegEx = RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);

  if (email === '') return { err: { message: '"email" is not allowed to be empty' }, code: 400 };
  
  if (!email) return { err: { message: '"email" is required' }, code: 400 }; 

  if (!emailRegEx.test(email)) {
    return { 
      err: {
      message: '"email" must be a valid email',
     },
     code: 400 };
  }
  return false;
};

const passwordVerificator = (password) => {
  if (password === '') {
    return { err: { message: '"password" is not allowed to be empty' }, code: 400 };
    } 

  if (!password) {
    return { 
      err: {
      message: '"password" is required',
     },
     code: 400 };
  }

  if (password.length !== 6) {
      return { 
        err: {
        message: '"password" length must be 6 characters long',
       },
       code: 400 };
     }

  return false;
};

const nameVerifcator = (name) => {
  if (name.length < 8 || !name) {
    return { 
      err: 
      { message: '"displayName" length must be at least 8 characters long' },
       code: 400,
       };
  }
  return false;
};

const RegisterValidate = ({ displayName, email, password }) => {
  const emailResult = emailVerificator(email);
  const passwordResult = passwordVerificator(password);
  const nameResult = nameVerifcator(displayName);

  if (emailResult) {
    return emailResult;
  }
  if (passwordResult) {
    return passwordResult;
  }
  if (nameResult) {
    return nameResult;
  }
  return false;
};

const loginValidate = (email, password) => {
  const emailResult = emailVerificator(email);
  const passwordResult = passwordVerificator(password);

  if (emailResult) {
    return emailResult;
  }
  if (passwordResult) {
    return passwordResult;
  }

  return false;
};

const userFinder = async (email) => User.findOne({ where: { email } });

const tokenFindUserId = async (token) => {
  const { data } = jwt.verify(token, JWT_SECRET);
  const result = await userFinder(data);
  return result;
};

const tokenValidator = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' }); 
  }
};

const nameValidator = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' }); 
  next();
};

const titleValidator = async (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  next();
};

const contentValidator = async (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: '"content" is required' });
next();
};

// recebi a ajuda do Cristian Bugs para incrementar a verificação da Validação de categoria id

const categoryIdValidator = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds || categoryIds.length === 0) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
   const allCategories = await Category.findAll();
  const categoryResult = allCategories.map((cat) => categoryIds[0] === cat.dataValues.id);
    
 if (categoryResult[0] === false && categoryResult[1] === false) {
  return res.status(400).json({ message: '"categoryIds" not found' });
 }
next();
};

module.exports = {
  JWTToken,
  nameValidator,
  RegisterValidate,
  loginValidate,
  userFinder,
  tokenValidator,
  tokenFindUserId,
  titleValidator,
  contentValidator,
  categoryIdValidator,
};