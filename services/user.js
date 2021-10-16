 const { RegisterValidate, JWTToken } = require('../middlewares');
const { User } = require('../models');

const EmailFinder = async (email) => {
  const result = await User.findOne({ where: { email } });
  if (result !== null) {
    return { err: { message: 'User already registered' }, code: 409 };
  }
  return false;
};

 const ServiceUserRegister = async (userData) => {
  const { email } = userData;

 const result = RegisterValidate(userData);
 if (result.err) {
   return result;
 }
 const emailExists = await EmailFinder(email);

 if (emailExists.err) {
  return emailExists;
}

 const { id } = await User.create(userData);
  
  const token = JWTToken(id, email);
  
  return { code: 201, token };
 };

 module.exports = {
  ServiceUserRegister,
 };