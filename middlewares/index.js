const auth = require('./auth');
const authPostUser = require('./authPostUser');
const errMiddlware = require('./errMiddleware');
const { login, user, categories, post, postEdit } = require('../schemas');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) next(error);
  next();
};

module.exports = {
  auth,
  authPostUser,
  errMiddlware,
  loginValidate: validate(login),
  userValidate: validate(user),
  ctgValidate: validate(categories),
  postValidate: validate(post),
  postEditValidate: validate(postEdit),
};
