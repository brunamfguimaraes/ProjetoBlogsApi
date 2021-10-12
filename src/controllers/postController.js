const postService = require('../services/postService');

async function create(req, res) {
  try {
    const { title, content, categoryIds } = req.body;
    const userId = req.user.id;

    const answer = { userId, title, content, categoryIds };
    
    const newPost = await postService.create(answer);

    return res.status(201).json(newPost);
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  create,
};