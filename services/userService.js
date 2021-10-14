const { user } = require('../models');

const validateName = (name) => {
  if (typeof (name) === 'string' && name.length > 7) {
    return true;
  }
  return { 
    status: 400, 
    message: '"displayName" length must be at least 8 characters long' };
};

const validatePass = (pass) => {
  if (pass && pass.length === 6) {
    return true;
  }
  return { status: 400, message: '"password" length must be 6 characters long' };
};

const validateEmail = (email) => {
  if ()
}

const createUser = async ({ displayName, email, password, image }) => {
  
};