const Sequelize = require('sequelize');

module.exports = (err, _req, res, _next) => {
  const statusCode = {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
  };

  if (err instanceof Sequelize.UniqueConstraintError) {
    const [error] = err.errors;
    const constructor = error.instance.constructor.name;
    return res.status(409).json({ message: `${constructor} already registered` });
  }
  const code = statusCode[err.name] || 500;
  return res.status(code).json({ message: err.message });
};
