const jwt = require('jsonwebtoken');

const secret = 'senhaToken';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const JWTToken = (id, email) => {
  const payload = { id, email };

  return jwt.sign({ data: payload }, secret, jwtConfig);
};

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

module.exports = {
  JWTToken,
  RegisterValidate,
  loginValidate,
};