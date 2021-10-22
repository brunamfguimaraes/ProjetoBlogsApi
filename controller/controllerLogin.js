const { loginUser } = require('../service/serviceLogin');
const genereteToken = require('../token/generetToken');

const creatSuccess = 200;

const controllerLogin = async (req, res) => {
    const result = await loginUser(req, res);
    const tokengeret = genereteToken(result);
    res.status(creatSuccess).json({ token: tokengeret });
};

module.exports = { controllerLogin };