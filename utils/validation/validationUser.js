const { User } = require('../../models');

const err = (statusCode) => (statusCode);

const displayNameUser = ({ displayName }) => {
  if (!displayName || displayName.length < 8) {
    throw err({ statusCode: 'displayNameLeastCharacter' });
  }
};

const emailUser = ({ email }) => {
  if (!email) throw err({ statusCode: 'emailNotExist' });
  const validEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!validEmail) throw err({ statuCode: 'emailNotValid' });
};

const passwordUser = ({ password }) => {
  if (!password) throw err({ statusCode: 'passwordNotExist' });
  if (password.length !== 6) throw err({ statusCode: 'passwordDiferentLength' });
};

const userExist = async ({ email }) => {
  const response = await User.findOne({ where: { email } });
  if (response) throw err({ statusCode: 'userExist' });
};

// const image = (imageUser) => {

// };

module.exports = {
  displayNameUser,
  emailUser,
  passwordUser,
  userExist,
  // image,
};
