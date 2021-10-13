const { User } = require('../models');

const fieldLength = (field, data) => {
  let length = 8;
  if (field === 'password') length = 6;
  const countName = data.length;
  if (countName < length) {
    const err = { name: 'displayError',
    message: `'${field}' lenght must be at least ${length} characters long` };
    throw err;
  }
};

const validateFields = (v1, v2) => {
  if (v1) fieldLength('displayName', v1);
  if (v2) fieldLength('password', v2);
};

const createNewUser = async (displayName, email, password, image) => {
  try {
    validateFields(displayName, password);
    const created = await User.create({ displayName, email, password, image });
    const response = { status: 'created', message: created };
    return response;
  } catch (e) {
    if (e.name === 'displayError') {
      const response = { status: 'displayName',
        message: e.message,
      };
        return response;
      }
  }
};

module.exports = {
  createNewUser,
};
