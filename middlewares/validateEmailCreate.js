module.exports = (req, _res, next) => {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email) {
    return next({ code: 'BAD_REQUEST', message: '"email" is required' });
  }

  if (!emailRegex.test(email)) { 
    return next(
      { code: 'BAD_REQUEST', message: '"email" must be a valid email' },
      );
  }

  return next();
};
