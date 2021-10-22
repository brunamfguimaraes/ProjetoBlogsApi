const { serviceUserValidation } = require('../service/serviceUser');
const genereteToken = require('../token/generetToken');

 const creatSuccess = 201;

const controllerUser = async (req, res) => {
    const result = await serviceUserValidation(req, res);
    const tokengeret = genereteToken(result);
    res.status(creatSuccess).json({ token: tokengeret });
};

module.exports = { controllerUser };