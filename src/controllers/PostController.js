const PostService = require('../services/PostService');

const newPost = async (req, res) => {
  try {
    const { title, categoryIds, content } = req.body;
    const { id: userId } = req.userId;
    const response = await PostService.newPost({ title, categoryIds, content, userId });

    if (response.message) {
      return res.status(400).json(response);
    }

    return res.status(201).json(response);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  newPost,
};
