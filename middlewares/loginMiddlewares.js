const BAD_REQUEST = 400;

const loginMessages = {
  emailRequired: () => '"email" is required',
  emailField: () => '"email" is not allowed to be empty',
  passwordRequired: () => '"password" is required',
  passwordField: () => '"password" is not allowed to be empty',
};

const emailRequired = (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(BAD_REQUEST).json(
      { message: loginMessages.emailRequired() },
    );
  }

  if (!email) {
    return res.status(BAD_REQUEST).json({
      message: loginMessages.emailField(),
    });
  }

  next();
};

const passwordRequired = (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(BAD_REQUEST).json(
      { message: loginMessages.passwordRequired() },
    );
  }

  if (!password) {
    return res.status(BAD_REQUEST).json({
      message: loginMessages.passwordField(),
    });
  }

  next();
};

module.exports = {
  passwordRequired,
  emailRequired,
};