const { User } = require('../models');

const { 
    validationName,
    validationEmail,
    validationPassword,
} = require('../middleware/validationUser');

const serviceUserValidation = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    validationName(res, displayName);
    validationEmail(res, email);
    validationPassword(res, password);
    try {
        await User.create({ displayName, email, password, image });
      } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado' });
      }
};

module.exports = { serviceUserValidation };