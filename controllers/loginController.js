const login = async (req, res) => {
  const { body } = req;
  res.status(200).json({ body });
};

module.exports = {
  login,
};