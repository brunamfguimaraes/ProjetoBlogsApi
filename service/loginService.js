const { User } = require('../models');
const validations = require('../validations/validations');

const validUndEmail = (email) => {
    if (email === undefined) return '"email" is required';
    if (email.length === 0) return '"email" is not allowed to be empty';
    if (email === undefined) return '"email" is required';
    return false;
};
const validUndPasswd = (password) => {
    if (password === undefined) return '"password" is required';

    return false;
};
const login = async ({ email, password }) => {
    console.log(email, password);
    if (typeof (validUndEmail(email)) === 'string') return validUndEmail(email);
    if (typeof (validUndPasswd(password)) === 'string') return validUndPasswd(password);
    console.log('passei');
  const find = await User.findOne({ where: { email } });
console.log(find);
  if (validations.validLogin(email, password, find)) {
      console.log('validei');
      return true;
    }
};

module.exports = { login };