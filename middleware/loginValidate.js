const loginService = require('../services/loginService');

const {    
  emailValidate, 
  validatePassword,
 } = require('../helpers/LoginValidation');

const loginValidate = async (req, res, next) => {
  const { email, password } = req.body;

  const validEmail = emailValidate(email);
  const passordValidation = validatePassword(password); 
  
  if (validEmail.fieldError) {
    return res.status(400).json({ message: validEmail.message });
  }

  if (passordValidation.fieldError) {
    return res.status(400).json({ message: passordValidation.message });
  }
  
  const emailExists = await loginService.checkEmailUser(email);
  
  if (emailExists.fieldError) {
    return res.status(400).json({ message: emailExists.message });
  }

  next();
};

module.exports = loginValidate;