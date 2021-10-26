const postService = require('../services/postService');

const validateUserPost = async (req, res, next) => {
    const userId = req.user;
    const { id } = req.params;
    const validUserPostId = await postService.validateFindPostById(id);
    console.log(validUserPostId);
    if (userId !== validUserPostId.userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    return next();
};

module.exports = validateUserPost;