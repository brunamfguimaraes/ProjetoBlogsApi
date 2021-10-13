module.exports = (req, _res, next) => {
  const { email } = req.body;
  
  if (email === undefined) {
    return next({ code: 'BAD_REQUEST', message: '"email" is required' });
  }
  
  if (email.length === 0) { 
    return next({ code: 'BAD_REQUEST', message: '"email" is not allowed to be empty' });
  } 

  return next();
};
