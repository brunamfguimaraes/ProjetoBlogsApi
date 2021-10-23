const { loginUser } = require('../service/serviceLogin');
const genereteToken = require('../token/generetToken');
const validateToken = require('../token/validateToken');
const { User } = require('../models');

const creatSuccess = 200;

const controllerLogin = async (req, res) => {
    const result = await loginUser(req, res);
    const tokengeret = genereteToken(result);
    res.status(creatSuccess).json({ token: tokengeret });
};

const userLoginController = async (req, res) => {
    await validateToken(req, res);
    try {
        const users = await User.findAll();
        res.status(200).json(users);
      } catch (e) {
        res.status(404).json(e.message);
      }
};

module.exports = { controllerLogin, userLoginController };