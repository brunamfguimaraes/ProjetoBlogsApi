const { User } = require('../models');

const {
    validationName,
    validationEmail,
    validationPassword,
    validationEmailExist,
} = require('../middleware/validationUser');

const serviceUserValidation = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    validationName(res, displayName);
    validationPassword(res, password);
    const { id } = await User.create({ displayName, email, password, image });
    return id;
};

module.exports = { serviceUserValidation };