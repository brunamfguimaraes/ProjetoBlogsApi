module.exports = (req, _res, next) => {
  const { password } = req.body;

  if (!password) {
    return next({ code: 'BAD_REQUEST', message: '"password" is required' });
  }

  if (password.length !== 6) { 
    return next({ code: 'BAD_REQUEST', message: '"password" length must be 6 characters long' });
  }

  return next();
};
