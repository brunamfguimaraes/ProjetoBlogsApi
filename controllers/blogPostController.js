const postServices = require('../services/blogPostService');

const post = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
 
  const result = await postServices.postNewPost({ userId, title, content, categoryIds });

  if (result.isError) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  return res.status(201).json(result);
};

const get = async (req, res, next) => {
  try {
    const result = await postServices.getAllPosts();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  post,
  get,
};
