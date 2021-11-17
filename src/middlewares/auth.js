const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../service/userService');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await findUserByEmail.findUser(decoded.data.userEmail);

    if (!user) {
    return res.status(401).json({
      message: 'Não foi possível encontrar o email do usuário informado no token',
    }); 
}

    req.userData = { user, admin: decoded.admin };

    next();
  } catch (err) {
    return res.status(401).json({ error: { message: err.message } });
  }
};
