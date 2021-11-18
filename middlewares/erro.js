const erroStatus = require('../utils/errosCode/erroStatus');

module.exports = (err, _req, res, _next) => {
  if (err.statusCode) {
    const { status, message } = erroStatus[err.statusCode];
    return res.status(status).json({ message });
  }
  return res.status(500).json({ message: 'Erro no Servidor' });
};
