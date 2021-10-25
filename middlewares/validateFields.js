const { StatusCodes } = require('http-status-codes');

const validateFields = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  
  if (!title) {
   return res.status(StatusCodes.BAD_REQUEST).json({ message: '"title" is required' });
  }
  
  if (!content) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"content" is required' });
  }
  
  if (!categoryIds) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"categoryIds" is required' });
  }
  
  next();
};

module.exports = validateFields;