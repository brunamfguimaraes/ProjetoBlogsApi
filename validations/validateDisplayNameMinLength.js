const RequestError = require('../helper/customErrors');

module.exports = (field = { fieldName: '', minLength: 0 }) => {
  let message = '';

  const [fieldKey, minLengthRequired] = Object.keys(field);
  if (!message && field[fieldKey].length < field[minLengthRequired]) { 
    message = `"${fieldKey}" length must be at least ${field[minLengthRequired]} characters long`; 
  }

  if (message) {
    throw new RequestError('badRequest', message);
  }
};