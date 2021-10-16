const CODE = require('http-status-codes');

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(CODE.BAD_REQUEST).json(
      { message: '"name" is required' },
      );
    }    
    next();
  };

module.exports = {
  nameValidation,
};