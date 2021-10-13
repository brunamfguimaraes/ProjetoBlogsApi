const validation = require('../helpers/UserValidation');

const userValidate = (req, res, next) => {
  const { displayName } = req.body;
  const userName = validation.validateDisplayName(displayName);
  if (userName.fieldError) {
    return res.status(400).json({ message: userName.message });
  } 

  next();
};

module.exports = userValidate;