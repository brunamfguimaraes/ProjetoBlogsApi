const { User } = require('../../models');

// const NUM = 0;
const code = 400;
const pattern = /\S+@\S+\.\S+/;

const errors = {
  nameLength: '"displayName" length must be at least 8 characters long',
  password: '"password" length must be 6 characters long',
  emailValid: '"email" must be a valid email',
  emailExists: '"email" is required',
  passwordExists: '"password" is required',
  userExists: 'User already registered',
};

const nameLength = (value, min) => value.length < min;
const isEmail = (email) => !email;
const isValidEamil = (email) => !email.match(pattern);
const passwordLength = (value, min) => value.length < min;
const isPassword = (password) => !password;
const userExists = async (email) => {
  const user = await User.findAll({ where: { email } });
  return !!user.length;
};

const userValidateEmailAndPassword = (email, password) => {
  const lenPass = 6;

  switch (true) {
  case isEmail(email): return { code, message: errors.emailExists };
  case isValidEamil(email): return { code, message: errors.emailValid };
  case isPassword(password): return { code, message: errors.passwordExists };
  case passwordLength(password, lenPass): return { code, message: errors.password };
  default: return {};
  }
};

const userValidate = async ({ displayName, email, password }) => {
  const lenName = 8;
  const validEmailPass = await userValidateEmailAndPassword(email, password);
  if (Object.keys(validEmailPass).length) return validEmailPass;
  switch (true) {
  case nameLength(displayName, lenName): return { code, message: errors.nameLength };
  case await userExists(email): return { code: 409, message: errors.userExists };
  default: return {};
  }
};

// const validateQuantity = async (quantity, id) => {
//   const err = 'Wrong product ID or invalid quantity';
//   const item = await getProdById(id);
//   if (!item) return { code, message: err };
//   switch (true) {
//   case isNumber(quantity): return { code, message: err };
//   case lessThanZero(quantity): return { code, message: err };
//   case +quantity > +item.quantity: return { code: 404, message: errors.amount };
//   default: return {};
//   }
// };

// const validateId = async (id) => {
//   const pattern = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
//   if (id.length !== 24 || !id.match(pattern)) return { code, message: errors.id };
//   const prod = await getProdById(id);
//   if (!prod) return { code, message: errors.id };
//   return {};
// };

module.exports = { userValidate };
