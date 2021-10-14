const CODE = require('http-status-codes');

const validateDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  
  if (((typeof displayName) !== 'string') || displayName.length < 8) {
    return res.status(CODE.BAD_REQUEST).json(
      { message: '"displayName" length must be at least 8 characters long' },
      );
    }
    
    next();
  };
  
  const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
    
  if (email === '') {
    return res.status(CODE.BAD_REQUEST).json(
      { message: '"email" is not allowed to be empty' },
      );
    }   

  if (!email) {
    return res.status(CODE.BAD_REQUEST).json(
      { message: '"email" is required' },
      );
    }
    
  if (!regex.test(email)) {
    return res.status(CODE.BAD_REQUEST).json(
      { message: '"email" must be a valid email' },
      );
    }
  
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(CODE.BAD_REQUEST).json(
      { message: '"password" is not allowed to be empty' },
      );
    }
  
  if (!password) {
    return res.status(CODE.BAD_REQUEST).json(
      { message: '"password" is required' },
      );
  }

  if (password.length !== 6) {
    return res.status(CODE.BAD_REQUEST).json(
      { message: '"password" length must be 6 characters long' },
      );
  }

  next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
};