const loginService = require('../services/loginService');

function validateEmail(req, res, next) {
  try {
    const { email } = req.body;
    
    const login = loginService.validateEmail(email);
    console.log(login);
    if (login === null) {
      return res.status(400)
        .json({ message: '"email" is required' });
    }
    
    if (!login) {
      return res.status(400)
        .json({ message: '"email" is not allowed to be empty' });
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

    const login = loginService.validatePassword(password);

    if (login === null) {
      return res.status(400)
      .json({ message: '"password" is required' });
    }

    if (!login) {
      return res.status(400)
      .json({ message: '"email" is not allowed to be empty' });
    }

    next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  validateEmail,
  validatePassword,
};