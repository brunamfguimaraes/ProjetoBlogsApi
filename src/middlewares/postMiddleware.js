const postService = require('../services/postService');

function validateTitle(req, res, next) {
  try {
    const { title } = req.body;

    const newPost = postService.validateTitle(title);
    if (newPost === null) {
      return res.status(400)
        .json({ message: '"title" is required' });
    }
    
    next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

function validateContent(req, res, next) {
  try {
    const { content } = req.body;

    const newPost = postService.validateContent(content);
    if (newPost === null) {
      return res.status(400)
        .json({ message: '"content" is required' });
    }
    
    next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

async function validateContegoryIds(req, res, next) {
  try {
    const { categoryIds } = req.body;

    const newPost = await postService.validateContegoryIds(categoryIds);
    if (newPost === null) {
      return res.status(400)
        .json({ message: '"categoryIds" is required' });
    }
    
    if (!newPost) {
      return res.status(400)
        .json({ message: '"categoryIds" not found' });
    }
    
    next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

async function validateExistPost(req, res, next) {
  try {
    const { id } = req.params;

    const post = await postService.getPostByID(id);
    if (post === null) {
      return res.status(404)
      .json({ message: 'Post does not exist' });
  }

    next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  validateTitle,
  validateContent,
  validateContegoryIds,
  validateExistPost,
};