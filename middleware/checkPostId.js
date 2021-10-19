const blogService = require('../service/blogPostService');

const checkPostId = async (req, res, next) => {
    const { id } = req.params;
    const Post = await blogService.checkIfPostExist(id);

    if (!Post) return res.status(404).send({ message: 'Post does not exist' });
  
    return next();
};

module.exports = checkPostId;