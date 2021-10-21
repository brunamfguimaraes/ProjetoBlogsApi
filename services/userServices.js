const { User } = require('../models');

const MIN_LENGTH_NAME = 8;

const validateName = (name) => (
  typeof name === 'string'
  && name.length >= MIN_LENGTH_NAME
    ? null : {
      message: `"displayName" length must be at least ${MIN_LENGTH_NAME} characters long`,
    }
);

const addUser = async ({ displayName, email, password, image }) => {
  const userExists = await User.findOne({ where: { email } });
  
  if (userExists !== null) return { message: 'User already registered' };
  
  const validName = validateName(displayName);
  if (validName !== null) return validName;
  
  await User.create({ displayName, email, password, image });
  
  return null;
};

module.exports = {
  addUser,
};
