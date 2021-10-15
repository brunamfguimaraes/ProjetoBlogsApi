const blogPostService = require('../services/blogPostService');

const {    
  validateTitle, 
  validateContent,
  validateCategory,
 } = require('../helpers/BlogPostValidation');

const blogPostValidate = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const validTitle = validateTitle(title);
  const validContent = validateContent(content);  
  const validCategoryId = validateCategory(categoryIds);
  
  if (validTitle.fieldError) {
    return res.status(400).json({ message: validTitle.message });
  }

  if (validContent.fieldError) {
    return res.status(400).json({ message: validContent.message });
  }

  if (validCategoryId.fieldError) {
    return res.status(400).json({ message: validCategoryId.message });
  }
  
  const categoryId = await blogPostService.checkCategoryId(categoryIds);
  
  if (categoryId.fieldError) {
    return res.status(400).json({ message: categoryId.message });
  }

  next();
};

module.exports = blogPostValidate;