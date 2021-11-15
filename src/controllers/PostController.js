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

const getPosts = async (req, res) => {
  try {
    const response = await PostService.getPosts();

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message }); 
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await PostService.getPost(id);

    if (response.message) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message }); 
  }
};

const changePost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: postId } = req.params;
    const { userId } = req;

    const response = await PostService
    .changePost({ title, content, postId, userId, categoryIds });

    if (response.message && response.unauthorized) {
      return res.status(401).json(response);
    }

    if (response.message) {
      return res.status(400).json(response);
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });  
  }
};

const deletePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { userId } = req;
    const response = await PostService.deletePost({ postId, userId });

    if (response.message && response.unauthorized) {
      return res.status(401).json(response);
    }

    if (response.message) {
      return res.status(404).json(response);
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });  
  }
};

module.exports = {
  newPost,
  getPosts,
  getPost,
  changePost,
  deletePost,
};
