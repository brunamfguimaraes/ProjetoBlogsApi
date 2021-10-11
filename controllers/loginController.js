const jwt = require('jsonwebtoken');
const { validateLogin } = require('../helpers/validate');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res) => {
  const message = validateLogin(req.body);
  if (message) return res.status(400).json({ message });
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || user.password !== req.body.password) {
      return res.status(400).json({ message: 'Invalid fields' }); 
    }
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Internal error', error: e });
  }
};