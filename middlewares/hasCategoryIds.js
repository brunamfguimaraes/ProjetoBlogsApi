const RequestError = require('../helper/customErrors');

module.exports = (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds) throw new RequestError('badRequest', 'Categories cannot be edited');
  next();
};