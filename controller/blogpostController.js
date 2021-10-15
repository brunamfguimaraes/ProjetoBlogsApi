const blogpostService = require('../services/blogpostsServices');
const codes = require('../middlewares/codes');

const createBlogpost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  try {
    const blogpost = await blogpostService.createBlogpost(title, content, categoryIds);

    return res.status(codes.created).json(blogpost);
  } catch (error) {
    const { code, message } = error;
    return res.status(code).json({ message });
  }
};

module.exports = { createBlogpost };