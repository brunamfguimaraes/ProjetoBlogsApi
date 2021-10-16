const { schemaBlogPosts } = require('../helpers/validateBlogPost');
const Error = require('../helpers/errors');

const blogPostValidate = (req, res, next) => {
  const { error } = schemaBlogPosts.validate(req.body);
  const { code } = Error.badRequest();
  if (error) {
    return res.status(code).json({
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = blogPostValidate;