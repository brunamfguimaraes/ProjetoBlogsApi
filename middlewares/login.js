const { Op } = require('sequelize');
const { User } = require('../models');

const existEmail = (req, res, next) => {
    if (!req.body.email) {
        return res.status(400).json({ message: '"email" is required' });
    }
    next();
};

const existPassword = (req, res, next) => {
    if (!req.body.password) {
        return res.status(400).json({ message: '"password" is required' });
    }
    next();
};

const blankPass = (req, res, next) => {
    if (req.body.password === '') {
            return res.status(400).json({ message: '"password" is not allowed to be empty' });
        }
    next();
};

const blankEmail = (req, res, next) => {
    if (req.body.email === '') {
        return res.status(400).json({ message: '"email" is not allowed to be empty' });
    }
    next();
};

const existUser = async (req, res, next) => {
    const { email } = req.body;

    const exist = await User.findAll({ where: { email: {
        [Op.eq]: email,
      } } });

      if (exist.length === 0) {
        return res
               .status(400).json({ message: 'Invalid fields' }); 
        }

    next();
};

module.exports = {
    existEmail,
    existPassword,
    blankPass,
    blankEmail,
    existUser,
};