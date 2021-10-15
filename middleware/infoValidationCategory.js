const rescue = require('express-rescue');

const nameIsRequired = rescue((req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: '"name" is required',
          });
        }
    next();
});

module.exports = { 
    nameIsRequired, 
};