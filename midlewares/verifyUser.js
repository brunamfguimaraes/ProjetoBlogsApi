// Source: https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
const { User } = require('../models');

const displayNameError = { message: '"displayName" length must be at least 8 characters long' };
const invalidEmailError = { message: '"email" must be a valid email' };
const mailRequiredError = { message: '"email" is required' };
const passwordLengthError = { message: '"password" length must be 6 characters long' };
const passwordError = { message: '"password" is required' };
const existentUserError = { message: 'User already registered' };

function validateUserName(req, res, next) {
    const { displayName } = req.body;
    if (!displayName) return res.status(400).json(displayNameError);
    if (displayName.length < 8) return res.status(400).json(displayNameError);
    next();
  }
  
async function validateEmail(req, res, next) {
  const { email } = req.body;
  // Colocar aqui uma condicao puxando do banco de dados os e-mails dos users ja registrados e return res.status(400).json(existentUserError)
  if (!email) { return res.status(400).json(mailRequiredError); }
  if (!email.match(/\S+@\S+\.\S+/)) { 
    return res.status(400).json(invalidEmailError); 
  }
  // console.log('cheguei aqui');
  const userMail = await User.findOne({ where: { email } });
  // console.log(userMail);
  if (userMail) return res.status(409).json(existentUserError);
    next();
}

function validatePassword(req, res, next) {
    const { password } = req.body;
    if (!password) { return res.status(400).json(passwordError); }
    if (password.length < 6) { 
      return res.status(400).json(passwordLengthError); 
    }
    next();
    // return res.status(201).json({ token: generateRandomToken() });
}

module.exports = { validateUserName, validateEmail, validatePassword };
