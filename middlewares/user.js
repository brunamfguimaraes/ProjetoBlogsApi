const { Op } = require('sequelize');
const { User } = require('../models');

const displayNameVerify = (req, res, next) => {
    const { displayName } = req.body;
    if (displayName.length < 8) {
 return res
        .status(400).json({ message: '"displayName" length must be at least 8 characters long' }); 
}
    next();
};

const Email = (req, res, next) => {
    const { email } = req.body;
    const parseEmail = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/i;
    if (!parseEmail.test(email)) {
        return res
        .status(400).json({ message: '"email" must be a valid email' });
    }
    next();
};

const existEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res
        .status(400).json({ message: '"email" is required' });
    }
    next();
};

const passwordLen = (req, res, next) => {
    const { password } = req.body;
    if (password.length !== 6) {
 return res
        .status(400).json({ message: '"password" length must be 6 characters long' }); 
}
    next();
};

const Password = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res
        .status(400).json({ message: '"password" is required' });
    }
    next();
};

const uniqueEmail = async (req, res, next) => {
    const { email } = req.body;
    const exist = await User.findAll({ where: { email: {
        [Op.eq]: email,
      } } });

    if (exist.length !== 0) {
 return res
        .status(409).json({ message: 'User already registered' }); 
}
    next();
};

module.exports = {
    displayNameVerify,
    Email,
    existEmail,
    Password,
    passwordLen,
    uniqueEmail,
};