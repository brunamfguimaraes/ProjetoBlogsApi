const blogPostService = require('../services/blogPostService');

const {    
  validateTitle, 
  validateContent,
  notUpdateCategorys,
 } = require('../helpers/BlogPostValidation');

const blogUpdateValidate = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;
  const { id } = req.params;
 
  const validTitle = validateTitle(title);
  const validContent = validateContent(content);  
  const validUpdateCategory = notUpdateCategorys(categoryIds);
  
  if (validTitle.fieldError) return res.status(400).json({ message: validTitle.message });  

  if (validContent.fieldError) return res.status(400).json({ message: validContent.message });  

  if (validUpdateCategory.fieldError) {
    return res.status(400).json({ message: validUpdateCategory.message });
  }

  const checkUser = await blogPostService.checkUserId(id, user.id);

  if (checkUser.fieldError) {
    return res.status(401).json({ message: checkUser.message });
  }

  next();
};

module.exports = blogUpdateValidate;