const { User, BlogPost, Category } = require('../models');

const validatePost = (title, content, categoryIds) => {
    if (!title) { return { err: { status: 400, message: '"title" is required' } }; }
    if (!content) return { err: { status: 400, message: '"content" is required' } };
    if (categoryIds) return { err: { status: 400, message: 'Categories cannot be edited' } };
    return true;
};

  const editBlogPostFunction = async ({ id }, { title, content }) => {
  await BlogPost.update({ ...BlogPost, title, content }, { where: { id } });
  const updatedPost = await BlogPost.findByPk(id, 
  { 
    include: { model: Category, as: 'categories', through: { attributes: [] } },
  });
  return updatedPost;
};

const editBlogPost = async (req, res) => {
    const { id } = req.params;
    const email = req.user;
    const { title, content, categoryIds } = req.body;
    const isValidPost = validatePost(title, content, categoryIds);
    if (validatePost !== true) {
      return res.status(isValidPost.err.status).json({ message: isValidPost.err.message }); 
    }
    
    const { id: userId } = await User.findOne({ where: { email } });     
    const postId = await BlogPost.findByPk(id);
    const blogPost = await editBlogPostFunction({ id }, { title, content, categoryIds });
    
    if (postId.id !== userId) {
        return res.status(401).json({ message: 'Unauthorized user' });
     }

    return res.status(200).json(blogPost);
};

module.exports = {
  editBlogPost,
};