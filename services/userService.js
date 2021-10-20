const { StatusCodes } = require('http-status-codes');
// https://www.npmjs.com/package/http-status-codes coisa boa viu
const Joi = require('joi');
const { Users } = require('../models');

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

 const Err409 = { message: 'User already registered' };

 const secret = process.env.JWT_SECRET || 'narguileira';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
 
const createUserService = async (displayName, email, password, image) => {
   const { error } = schemaUser.validate({ displayName, email, password });
    if (error) {
      return {
      isError: true,
      err: { message: error.details[0].message },
      status: StatusCodes.BAD_REQUEST,
    };
  }
  const user = await Users.findOne({ where: { email } });
  
  if (user) {
    return { isError: true, err: Err409, status: 409 };
  }

  const newUser = await Users.create({ displayName, email, password, image });

  return newUser;
};

const userLogin = async (email, password) => {
  const { error } = schemaUserLogin.validate({ email, password });
  if (error) {
   return {
     isError: true,
     err: { message: error.details[0].message },
     status: StatusCodes.BAD_REQUEST,
   };
  }
  const login = await Users.findOne({ where: { email, password } });
  
  if (!login) {
   return { isError: true,
      err: { message: 'Invalid fields' },
     status: StatusCodes.BAD_REQUEST,
   };
  }

  const { password: _, ...userWithoutPassword } = login.dataValues;

  const token = jwt.sign(userWithoutPassword, secret, jwtConfig);
 
  return token;
};

 module.exports = {
  createUserService,
  userLogin
}; 
