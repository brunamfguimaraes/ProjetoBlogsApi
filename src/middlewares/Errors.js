/* eslint-disable complexity */
const ERRORS_DICT = {
  userRegistered: 409,
  invalidFields: 400,
  userNotFound: 404,
  categoryNotFound: 400,
  noEdit: 400,
  postNotFound: 404,
  invalidUser: 401,
};

const errorsKeys = Object.keys(ERRORS_DICT);

const checkErrorType = (error) => {
  if (error.isJoi) {
    return { code: 400, message: error.details[0].message };
  }

  for (let i = 0; i < errorsKeys.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(error, errorsKeys[i])) {
      return { code: ERRORS_DICT[errorsKeys[i]], message: error.message };
    }
  }
  
  return { code: 500, message: error };
};

module.exports = (err, _req, res, next) => {
  const { code, message } = checkErrorType(err);
  console.log(err);

  res.status(code).json({ message });

  next();
};
