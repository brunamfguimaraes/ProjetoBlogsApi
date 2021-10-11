const userService = require('../services/userService');

function validateDisplayName(req, res, next) {
  try {
    const { displayName } = req.body;
    if (!userService.validateDisplayName(displayName)) {
      return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' });
    }
  
    next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

function validateEmail(req, res, next) {
  try {
    const { email } = req.body;
    const newUser = userService.validateEmail(email);

    if (newUser === null) {
      return res.status(400)
        .json({ message: '"email" is required' });
    }
    
    if (!newUser) {
      return res.status(400)
        .json({ message: '"email" must be a valid email' });
    }
  
    next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

function validatePassword(req, res, next) {
  try {
    const { password } = req.body;
  
    if (userService.validatePassword(password) === null) {
      return res.status(400)
        .json({ message: '"password" is required' });
    }
  
    if (!userService.validatePassword(password)) {
      return res.status(400)
        .json({ message: '"password" length must be 6 characters long' });
    }
  
    return next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
};