const { findUserByEmail } = require('./userService');

const validEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email === '') return { message: '"email" is not allowed to be empty' };
  if (!email) return { message: '"email" is required' };
  if (!re.test(email)) return { message: '"email" must be a valid email' };
};

const validPassword = (password) => {
  if (password === '') return { message: '"password" is not allowed to be empty' };
  if (!password) return { message: '"password" is required' };
  if (password.toString().length !== 6) {
    return { 
      message: '"password" length must be 6 characters long', 
    }; 
  }
};

const cantUserLogin = async (email, password) => {
  const dataCheck = await Promise.all([
    validEmail(email),
    validPassword(password),
  ]);
 
  const invalidFieldsMessage = dataCheck.filter((e) => e !== undefined);

  return invalidFieldsMessage[0];
};

const isValidUserToLogin = async (email, password) => {
  const cantLoginMessage = await cantUserLogin(email, password);

  if (cantLoginMessage) return { errorMessage: cantLoginMessage };

  const user = await findUserByEmail(email);

  if (!user || user.dataValues.password !== password) {
    return {
      errorMessage: { message: 'Invalid fields' },
    }; 
  }

  return user;
};

module.exports = {
  isValidUserToLogin,
};
