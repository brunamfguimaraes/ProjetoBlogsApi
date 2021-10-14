const { code, errorMessage } = require('../schema/index');

const validateName = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('displayName') });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i;
  
  if (!email || !email.length) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('noEmail') });
  }
  
  if (!regexEmail.test(email)) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('email') });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.length) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('noPassword') });
  }
  
  console.log(password.toString().length !== 6);
  if (password.toString().length !== 6) {
    return res.status(code.HTTP_BAD_REQUEST).json({ message: errorMessage('password') });
  }

  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
