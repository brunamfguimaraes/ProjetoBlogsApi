const { findByEmail } = require('../service/userService');

const checkIfUserExist = async (req, res, next) => {
  const { email } = req.body;

  const userAlreadyExist = await findByEmail(email);

    if (userAlreadyExist) {
      return res.status(409).send({ message: 'User already registered' });
    }
    return next();
};

module.exports = checkIfUserExist;