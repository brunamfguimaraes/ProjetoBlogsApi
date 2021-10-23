const { User } = require('../models');

// const ifNoExist = (array) => array.find((entrie) => Object.values(entrie) === null);

const isValid = (email) => ((/\S+@\S+\.\S+/).test(email));

const validCharacters = (value, character) => {
  if (value.length <= character) { 
    return `${value} length must be at least ${character} characters long`; 
  }
  return false;
};

// const createUser = async ({ displayName, email, password, image }) => {
//   const userExist = await User.findOne({ where: { email } });
//   if (userExist) return { erro: { code: 409, message: 'User already registered' } };

//   const ifNoExists = ifNoExist([email, password]);
//   if (ifNoExists) return { erro: { code: 400, message: `${ifNoExists} is required` } };

//   const validateEmail = isValid(email);
//   if (!validateEmail) return { erro: { code: 400, message: '"email" must be a valid email' } };

//   const validatePassword = validCharacters(password, 6);
//   if (validatePassword) return { erro: { code: 400, message: validatePassword } };

//   const validateName = validCharacters(displayName, 8);
//   if (validateName) return { erro: { code: 400, message: validateName } };

//   return User.create({ displayName, email, password, image });
// };

const validateEmail = async (email) => {
  if (!email) return { erro: { code: 400, message: '"email" is required' } };

  const userExist = await User.findOne({ where: { email } });
  if (userExist) return { erro: { code: 409, message: 'User already registered' } };

  const validEmail = isValid(email);
  if (!validEmail) return { erro: { code: 400, message: '"email" must be a valid email' } };

  return 'valid';
};

const validateName = async (displayName) => {
  if (!displayName) return { erro: { code: 400, message: '"displayName" is required' } };

  const validName = validCharacters(displayName, 8);
  if (validName) return { erro: { code: 400, message: validName } };

  return 'valid';
};

const validatePassword = async (password) => {
  if (!password) return { erro: { code: 400, message: '"password" is required' } };

  const validPassword = validCharacters(password, 6);
  if (validPassword) return { erro: { code: 400, message: validPassword } };

  return 'valid';
};

const createUser = async ({ displayName, email, password, image }) => {
  const validEmail = validateEmail(email);
  const validName = validateName(displayName);
  const validPassword = validatePassword(password);

  if (validEmail === 'valid' && validName === 'valid' && validPassword === 'valid') {
    return User.create({ displayName, email, password, image });
  }
};

module.exports = { createUser };