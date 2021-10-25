const blogPostService = require('../services/blogPostService');

const serverError = 'server error';

const createBlogPost = async (req, res) => {
    const { title, content, categoryIds, data } = req.body;
    const { id } = data;
    const userId = id;
    try {
    const result = await blogPostService.createBlogPost(title, content, categoryIds, userId);

    if (result.status === 201) {
    const postCreated = result.post; 
      return res.status(result.status).json(postCreated);
    }

    return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: serverError });
    }
};

module.exports = {
    createBlogPost,
};