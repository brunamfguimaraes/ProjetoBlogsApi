const codeErro = require('./codeErro');

module.exports = (error, _req, res, _next) => {
  console.log(error);
  if (error.statusCode) {
    const { status, message } = codeErro[error.statusCode];
    return res.status(status).json({ message });
  }
  return res.status(500).json({ message: error });
};
