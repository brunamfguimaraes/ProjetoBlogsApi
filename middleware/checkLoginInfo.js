const { findByEmailAndPassword } = require('../service/userService');

const checkLoginInfo = async (req, res, next) => {
  const { email, password } = req.body;

  const LoginIsValid = await findByEmailAndPassword(email, password);

    if (!LoginIsValid) {
      return res.status(400).send({ message: 'Invalid fields' });
    }
    return next();
};

module.exports = checkLoginInfo;