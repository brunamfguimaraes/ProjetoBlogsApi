const { validateLoginData, userExists } = require('../schemas/validateUser');
const { ApiError } = require('../utils/ApiError');

const checkLoginData = async (body) => {
  await validateLoginData(body);

  const userInDb = await userExists(body.email);

  if (!userInDb) {
    throw new ApiError('Invalid fields', 400);
  }
};

module.exports = {
  checkLoginData,
};
