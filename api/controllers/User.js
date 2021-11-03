const { StatusCodes } = require('http-status-codes');

const User = require('../services/User');

const registerNewUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const token = await User.registerNewUser(displayName, email, password, image);
  if (token.errMsg) {
    return next({
      codeErr: token.codeErr,
      errMsg: token.errMsg,
    });
  }

  res.status(StatusCodes.CREATED).json(token);
};

// const loginUser = async (req, res, next) => {
//   const { email, password } = req.body;

//   const token = await Users.loginUser(email, password);
//   if (token.isErrorMessage) {
//     return next({
//       codeError: token.codeError,
//       isErrorMessage: token.isErrorMessage,
//     });
//   }

//   res.status(StatusCodes.OK).json(token);
// };

module.exports = {
  registerNewUser,
  // loginUser,
};
