const error = (err, _req, res, _next) => {
  const { message } = err;
  const statusCode = {
    '"displayName" length must be at least 8 characters long': 400,
    '"email" must be a valid email': 400,
    '"password" length must be 6 characters long': 400,
    '"email" is required': 400,
    'User already registered': 409,
  };
  
  if (statusCode[message]) return res.status(statusCode[message]).json(err);
  return res.status(500).send(err);
  };
  
  module.exports = error;