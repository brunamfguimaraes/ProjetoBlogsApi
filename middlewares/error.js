module.exports = (err, _req, res, _next) => {
  if (err === 500) return res.status(err).send('Something went wrong. Please try again');

  const { status, message } = err.error;
  return res.status(status).json({ message });
};