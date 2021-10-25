const { User } = require('../models');

const isValid = (email) => ((/\S+@\S+\.\S+/).test(email));

const validCharacters = (value, character, type) => {
  if (value.length < character) { 
    return `"${type}" length must be at least ${character} characters long`; 
  }
};

const validCharacters2 = (value, character, type) => {
  if (value.length < character) { 
    return `"${type}" length must be ${character} characters long`; 
  }
};

// const ifNoExist = (array) => array.find((entrie) => Object.values(entrie) === null);

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

  return true;
};

const validatePassword = (password, email) => {
  if (!password) return { erro: { code: 400, message: '"password" is required' } };

  const validPassword = validCharacters2(password, 6, 'password');
  if (validPassword) return { erro: { code: 400, message: validPassword } };

  return validateEmail(email);
};

const validateName = (displayName, password, email) => {
  if (!displayName) return { erro: { code: 400, message: '"displayName" is required' } };

  const validName = validCharacters(displayName, 8, 'displayName');
  if (validName) return { erro: { code: 400, message: validName } };

  return validatePassword(password, email);
};

const createUser = async ({ displayName, email, password, image }) => {
  const validName = await validateName(displayName, password, email);
  if (validName.erro) return validName;

  // const validPassword = validatePassword(password);
  // if (validPassword.erro) return validPassword;
  // console.log(validPassword);

  // const validEmail = await validateEmail(email);
  // if (validEmail.erro) return validEmail;
  // console.log(validEmail);

  if (validName) return User.create({ displayName, email, password, image });
};

module.exports = { createUser };