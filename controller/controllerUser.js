const { serviceUserValidation } = require('../service/serviceUser');
const genereteToken = require('../token/generetToken');

 const creatSuccess = 201;

const controllerUser = (req, res) => {
    serviceUserValidation(req, res);
    const tokengeret = genereteToken();
    res.status(creatSuccess).json({ token: tokengeret });
};

module.exports = { controllerUser };