const checkIfTheUserExists = require('../validations/checkIfTheUserExists');

const loginUser = async ({ email, password }) => {
  const responseModel = await checkIfTheUserExists(email, password);
  if (!responseModel.isError) return { isError: true, message: 'Invalid fields' };
  return { isError: false };
};

module.exports = { loginUser };