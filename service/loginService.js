const { User } = require('../models');
const HTTP_REST = require('../HTTPErrosAndMessages');
const tokenUtil = require('../util/token');

// const tokenUtil = require('../util/token');

const { message } = HTTP_REST;

const loginUser = async (user) => {
    const { email, password } = user;
    const userValidate = await User.findOne({ where: { email, password } });
    if (!userValidate) {
        return { message: message.INVALID_FIELDS };
    }
        return { token: tokenUtil.createToken(email) };
};

module.exports = {
    loginUser,
};