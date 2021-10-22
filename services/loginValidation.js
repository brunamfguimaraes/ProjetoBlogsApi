const { User } = require('../models');

const BAD_REQUEST = 400;

// req 2
// Verifica se o campo email existe, se está vazio e se o email é no formato válido
const loginEmailValidation = (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(BAD_REQUEST).json({ message: '"email" is not allowed to be empty' });
  }
  
  if (!email) {
    return res.status(BAD_REQUEST).json({ message: '"email" is required' });
  }

  const regexEmail = /[a-zA-Z]+@[a-zA-Z]+/;
  if (!regexEmail.test(email)) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
  }

  next();
};

// req 2
// Verifica se o campo senha existe e que não está vazio
const loginPasswordValidation = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(BAD_REQUEST).json({ message: '"password" is not allowed to be empty' });
  }
  
  if (!password) {
    return res.status(BAD_REQUEST).json({ message: '"password" is required' });
  }

  next();
};

// req 2
const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const { dataValues } = await User.findOne({ where: { email } });
    if (!dataValues || dataValues.password !== password) { 
      return res.status(BAD_REQUEST).json({ message: 'Invalid fields' }); 
    }
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
  }

  next();
};

module.exports = {
  loginEmailValidation,
  loginPasswordValidation,
  loginValidation,
};
