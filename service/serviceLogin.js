const { validationEmail, validationPassword } = require('../middleware/validationUser');
const { validationLoginEmail,
    validationLoginPassword, 
    validationLoginUser } = require('../middleware/validationLogin');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    validationLoginEmail(res, email);
    validationLoginPassword(res, password);
    validationEmail(res, email);
    validationPassword(res, password);
    const { id } = await validationLoginUser(res, email, password);
    return id;
};

module.exports = { loginUser };