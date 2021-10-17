const { serviceUserValidation } = require('../service/serviceUser');

 const creatSuccess = 201;

const controllerUser = (req, res) => {
    const { displayName, email, password, image } = req.body;
    serviceUserValidation(res, displayName, email, password, image);
    // const token = genereteToken();
     res.status(creatSuccess).json("result");
};

module.exports = { controllerUser };