const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

const ERRORS_DICT = {
  userRegistered: CONFLICT,
  invalidFields: BAD_REQUEST,
  userNotFound: NOT_FOUND,
  categoryNotFound: BAD_REQUEST,
  noEdit: BAD_REQUEST,
  postNotFound: NOT_FOUND,
  invalidUser: UNAUTHORIZED,
};

const errorsKeys = Object.keys(ERRORS_DICT);

const checkErrorType = (error) => {
  if (error.isJoi) {
    return { code: BAD_REQUEST, message: error.details[0].message };
  }

  for (let i = 0; i < errorsKeys.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(error, errorsKeys[i])) {
      return { code: ERRORS_DICT[errorsKeys[i]], message: error.message };
    }
  }
  
  return { code: INTERNAL_SERVER_ERROR, message: error };
};

module.exports = (err, _req, res, next) => {
  const { code, message } = checkErrorType(err);
  console.log(err);

  res.status(code).json({ message });

  next();
};
