const { displayNameValidate } = require('../helpers/userValidations');

module.exports = (req, res, next) => {
  const { displayName } = req.body;

  const displayNameValidated = displayNameValidate(displayName);

  if (displayNameValidated.isError) {
    return res.status(400).json({ message: displayNameValidated.message });
  }

  next();
};