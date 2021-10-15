const { BlogPost, Category } = require('../models');
const { validateIfPostBlogPostFieldsExist } = require('../middlewares/BlogPostMiddlewares');

const checkCategorys = async (categoryIds) => {
  const categorys = await Category.findAll({ attributes: ['id'] }).then((projects) => projects);

  const data = categorys.map((object) => object.id);

  const check = categoryIds.every((el) => data.includes(el));

  if (!check) return false;
  return true; 
};

const createBlogPostService = async (body, user) => {
  const { categoryIds, title, content } = body;
  const validateField = validateIfPostBlogPostFieldsExist(body);
  if (validateField) return validateField;
  console.log(user, 'user');

  const validateCategory = await checkCategorys(categoryIds);

  if (!validateCategory) return { message: '"categoryIds" not found' };

const blogPost = BlogPost
.create({ categoryIds, title, content, userId: user, published: new Date(), updated: new Date() });
return blogPost;
};

const getAllPostsService = async () => {
  const posts = await BlogPost.findAll();

  return posts;
};

module.exports = { createBlogPostService, getAllPostsService };