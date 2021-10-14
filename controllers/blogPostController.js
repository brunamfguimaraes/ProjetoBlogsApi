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

module.exports = {
  post,
};
