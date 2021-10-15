const rescue = require('express-rescue');

const validateDisplayName = rescue((req, res, next) => {
    const { displayName } = req.body;

    if (!displayName || displayName.length < 8 || displayName === null) {
        return res.status(400).json({
            message: '"displayName" length must be at least 8 characters long',
          });
        }
    next();
});

const emailIsRequired = rescue((req, res, next) => {
    const { email } = req.body;

    if (!email || email === null || email === '') {
        return res.status(400).json({
            message: '"email" is required',
          });
        }
    next();
});

const emailIsRequiredLogin = rescue((req, res, next) => {
    const { email } = req.body;

    if (email === '') {
        return res.status(400).json({
            message: '"email" is not allowed to be empty',
          });
        }
    next();
});

const validateEmail = rescue((req, res, next) => {
    const regex = /((\w+)@(\w+)\.(\w+))/i;
    const { email } = req.body;

    if (!email.match(regex)) {
        return res.status(400).json({
            message: '"email" must be a valid email',
          });
        }
    next();
});

const passwordIsRequired = rescue((req, res, next) => {
    const { password } = req.body;

    if (!password || password === null || password === '') {
        return res.status(400).json({
            message: '"password" is required',
          });
        }
    next();
});

const passwordIsRequiredLogin = rescue((req, res, next) => {
    const { password } = req.body;

    if (password === '') {
        return res.status(400).json({
            message: '"password" is not allowed to be empty',
          });
        }
    next();
});

const validatePassword = rescue((req, res, next) => {
    const { password } = req.body;

    if (password.length !== 6) {
        return res.status(400).json({
            message: '"password" length must be 6 characters long',
          });
        }
    next();
});

module.exports = { 
    validateDisplayName, 
    validateEmail, 
    emailIsRequired, 
    validatePassword, 
    passwordIsRequired,
    emailIsRequiredLogin,
    passwordIsRequiredLogin,
};