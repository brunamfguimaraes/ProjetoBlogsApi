const { serviceUserValidation } = require('../service/serviceUser');
const genereteToken = require('../token/generetToken');
const { User } = require('../models');
const RequestError = require('../helper/customErrors');

 const creatSuccess = 201;
 let err;

const controllerUser = async (req, res) => {
    const result = await serviceUserValidation(req, res);
    const tokengeret = genereteToken(result);
    res.status(creatSuccess).json({ token: tokengeret });
};

const getUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            err = { status: 404, message: 'User does not exist' };
            RequestError(res, err);
        }
        return res.status(200).json(user);
      } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado' });
      }
};

module.exports = { controllerUser, getUserId };