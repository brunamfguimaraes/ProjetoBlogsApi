const { 
  checkFieldName,
} = require('../validations');

const addCategory = async (name) => {
  const verifyFields = checkFieldName(name);

  if (verifyFields) {
    return verifyFields;
  }

  return {};
};

module.exports = { 
  addCategory,
};