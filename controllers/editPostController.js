const { User, BlogPost, Category } = require('../models');

  const editBlogPostFunction = async ({ id }, { title, content, categoryIds }, res) => {
  if (!title) { return res.status(400).json({ message: '"title" is required' }); }
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });
  
  await BlogPost.update({ ...BlogPost, title, content }, { where: { id } });
  const updatedPost = await BlogPost.findByPk(id, 
  { 
    include: { model: Category, as: 'categories', through: { attributes: [] } },
  });
  return updatedPost;
};

const editBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.user;
    const { id: userId } = await User.findOne({ where: { email } }); 
    console.log('userId: ', userId);
    const { title, content, categoryIds } = req.body;
    const postId = await BlogPost.findByPk(id);
    console.log('postId:', postId);
   const blogPost = await editBlogPostFunction({ id }, { title, content, categoryIds }, res);
  if (postId.id !== userId) {
        return res.status(401).json({ message: 'Unauthorized user' });
     }

    return res.status(200).json(blogPost);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  editBlogPost,
};