const RequestError = require('../helper/customErrors');

module.exports = (email) => {
  const isValid = /\w+@\w+/g.test(email);
  if (!isValid) {
    throw new RequestError('badRequest', '"email" must be a valid email');
  }
};