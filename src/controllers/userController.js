const userService = require('../services/userService');

function validateDisplayName(req, res, next) {
  const { displayName } = req.body;
  if (!userService.validateDisplayName(displayName)) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  next();
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  
  if (userService.validateEmail(email) === null) {
    return res.status(400)
      .json({ message: '"email" is required' });
  }
  
  if (!userService.validateEmail(email)) {
    return res.status(400)
      .json({ message: '"email" must be a valid email' });
  }

  next();
}

function validatePassword(req, res, next) {
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
}

async function create(req, res) {
  try {
    const { body } = req;
    const { token } = req;
    const newUser = await userService.create(body);

    if (!newUser) {
      return res.status(409).json({ message: 'User already registered' });
    }

    return res.status(201).json({ token });
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  create,
};