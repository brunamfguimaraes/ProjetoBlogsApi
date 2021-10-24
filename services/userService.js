const { User } = require('../models');
const { validateEmail, existEmail } = require('../validations/validations');

const createUser = async ({ displayName, email, password, image }) => {
  const isEmailValid = validateEmail(email);
  if (!isEmailValid) { return { message: '"email" must be a valid email' }; }
  
  const doUserExist = await existEmail(email);
  if (doUserExist.message) { return { message: doUserExist.message }; }
  
  const user = await User.create({ displayName, email, password, image });
  return user;
};

module.exports = {
  createUser,
}