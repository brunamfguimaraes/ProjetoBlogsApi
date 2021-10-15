const RequestError = require('../helper/customErrors');

let err;

const validationEmail = (email) => {
    const isValid = /\w+@\w+/g.test(email);
    if (!isValid) {
      throw new RequestError('badRequest', '"email" must be a valid email');
    }
};

const validationName = (displayName) => {
    if (displayName.length < 8) {
        err = { message: '"displayName" length must be at least 8 characters long' };
        return err;
    }
};

 const validationPassword = (password) => {
    
};

// const = () => {
    
// }

module.exports = { validationEmail, validationName, validationPassword }; 