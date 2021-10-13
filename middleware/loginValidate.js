const loginValidate = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const userName = validateDisplayName(displayName);
  const validEmail = emailValidate(email);
  const passordValidation = validatePassword(password);
  
  if (userName.fieldError) {
    return res.status(400).json({ message: userName.message });
  }
  
  if (validEmail.fieldError) {
    return res.status(400).json({ message: validEmail.message });
  }

  if (passordValidation.fieldError) {
    return res.status(400).json({ message: passordValidation.message });
  }
  
  // const emailExists = await userService.checkEmailUser(email);
  
  if (emailExists.fieldError) {
    return res.status(409).json({ message: emailExists.message });
  }

  next();
};

module.exports = loginValidate;