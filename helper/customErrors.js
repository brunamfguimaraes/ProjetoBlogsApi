function RequestError(res, err) {
    const { status, message } = err;
    res.status(status).json({ message });
  }
  
  module.exports = RequestError;
