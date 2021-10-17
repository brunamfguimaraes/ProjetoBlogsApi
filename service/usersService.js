const { User } = require('../models');
const HTTP_REST = require('../HTTPErrosAndMessages');

const tokenUtil = require('../util/token');

const { message } = HTTP_REST;

const addUser = async (user) => {
    const { email } = user;
    const userValidate = await User.findOne({ where: { email } });
    if (!userValidate) {
        await User.create({ ...user });
        return { token: tokenUtil.createToken(user.email) };
    }
    return { message: message.USER_EXISTS };
};

module.exports = {
    addUser,
};