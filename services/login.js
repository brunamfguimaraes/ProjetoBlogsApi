const validateEmail = async (req, res, next) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: '"email" is required' });
    }
    next();
  };
  
  const validatePassword = async (req, res, next) => {
    const { password } = req.body;
  
    if (!password) {
      return res.status(400).json({ message: '"password" is required' });
    }
    next();
  };
  
  const emailIsNotNull = async (req, res, next) => {
    const { email } = req.body;
  
    if (email === '' || email === null) {
      return res.status(400).json({ message: '"email" is not allowed to be empty' });
    }
    next();
  };
  
  const passwordIsNotNull = async (req, res, next) => {
    const { password } = req.body;
  
    if (password === '' || password === null) {
      return res.status(400).json({ message: '"password" is not allowed to be empty' });
    }
    next();
  };
  
  module.exports = {
    validateEmail,
    validatePassword,
    emailIsNotNull,
    passwordIsNotNull,
  }; 