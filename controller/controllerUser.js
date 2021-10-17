const { serviceUserValidation } = require('../service/serviceUser');

 const creatSuccess = 201;

const controllerUser = (req, res) => {
    const tokengeret = serviceUserValidation(req, res);
    res.status(creatSuccess).json({ token: tokengeret });
};

module.exports = { controllerUser };