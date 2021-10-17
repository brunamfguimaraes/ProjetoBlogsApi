const { User } = require('../models');

const checkUserExists = async (email, password, res) => {
    const check = await User.findOne({ where: { email, password } });
    console.log(check, 'check');
    if (check === null) {
    return res.status(400).json({
        message: 'Invalid fields',
        });
    }
};

module.exports = { checkUserExists };
