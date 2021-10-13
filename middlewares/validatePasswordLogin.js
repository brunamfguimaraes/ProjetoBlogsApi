module.exports = (req, _res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return next({ code: 'BAD_REQUEST', message: '"password" is required' });
  }
  
  if (password.length === 0) { 
    return next({ code: 'BAD_REQUEST', message: '"password" is not allowed to be empty' });
  }

  return next();
};
