const postServices = require('../services/blogPostService');

const postController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
 
  const result = await postServices.postNewPost({ userId, title, content, categoryIds });

  if (result.isError) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(201).json(result);
};

const getPostController = async (_req, res) => {
  try {
    const result = await postServices.getAllPosts();

   return res.status(200).json(result);
  } catch (error) {
   return res.status(500).json('Internal error');
  }
};

const getByIdPosts = async (req, res) => {
  const { id } = req.params;
  const result = await postServices.getByIdPosts(id);

  if (result.isError) {
     return res.status(result.code).json({ message: result.message });
  }

  res.status(200).json(result);
};

module.exports = {
  postController,
  getPostController,
  getByIdPosts,
};
