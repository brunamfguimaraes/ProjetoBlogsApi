const { StatusCodes } = require('http-status-codes');

module.exports = (err, _req, res, _next) => { 
  if (err.message) {
    const { code, message } = err;
    return res.status(StatusCodes[code]).json({ message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};
