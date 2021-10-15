const { schemaCategories } = require('../helpers/validateCategorie');
const Error = require('../helpers/errors');

const categoriesValidate = (req, res, next) => {
  const { error } = schemaCategories.validate(req.body);
  const { code } = Error.badRequest();
  if (error) {
    return res.status(code).json({
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = categoriesValidate;