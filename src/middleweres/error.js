module.exports = (err, _req, res, _next) => {
  console.error(err);

  if (err.status) {
    return res.status(err.status).json({ error: { message: err.message } });
  }

  return res.status(500).json({
    error: { message: `Internal server error: ${err.message}` },
  });
};
