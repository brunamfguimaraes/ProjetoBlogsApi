const statusCode = {
  '"displayName" length must be at least 8 characters long': 400,
  '"email" must be a valid email': 400,
  '"email" is required': 400,
  '"email" is not allowed to be empty': 400,
  '"password" is required': 400,
  '"password" is not allowed to be empty': 400,
  '"password" length must be 6 characters long': 400,
  '"name" is required': 400,
  'Invalid fields': 400,
  '"title" is required': 400,
  '"categoryIds" is required': 400,
  '"content" is required': 400,
  'Categories cannot be edited': 400,
  '"categoryIds" not found': 400,
  'Token not found': 401,
  'Expired or invalid token': 401,
  'Unauthorized user': 401,
  'User does not exist': 404,
  'Post does not exist': 404,
  'User already registered': 409,
  '"Category" already exists': 409,
};

const error = (err, _req, res, _next) => {
  const { message } = err;  
  if (statusCode[message]) return res.status(statusCode[message]).json(err);
  return res.status(500).send(err);
  };
  
  module.exports = error;