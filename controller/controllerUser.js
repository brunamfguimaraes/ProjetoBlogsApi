const { serviceUserValidation } = require('../service/serviceUser');

 const creatSuccess = 201;

const controllerUser = (req, res) => {
    const { displayName, email, password, image } = req.body;
    const result = serviceUserValidation(displayName, email, password, image);
    // const token = genereteToken();
     return res.status(creatSuccess).json(result);
};

module.exports = { controllerUser };