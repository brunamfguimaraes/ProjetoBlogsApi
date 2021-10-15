const { loginAuth } = require('../services/User');

const requestLogin = async (req, res) => {
  const { email, password } = req.body;
  const login = await loginAuth(email, password);

  if (login) res.status(200).json({ token: login });

  if (!login) res.status(400).json({ message: 'Invalid fields' });
};

module.exports = requestLogin;
