const { serviceUserValidation } = require('../service/serviceUser');
const genereteToken = require('../token/generetToken');
const { validationEmailExist, validationEmail } = require('../middleware/validationUser');

 const creatSuccess = 201;

const controllerUser = async (req, res) => {
    const { email } = req.body;
    validationEmail(res, email);
    await validationEmailExist(res, email);
    const result = serviceUserValidation(req, res);
    const tokengeret = genereteToken(result);
    res.status(creatSuccess).json({ token: tokengeret });
};

module.exports = { controllerUser };