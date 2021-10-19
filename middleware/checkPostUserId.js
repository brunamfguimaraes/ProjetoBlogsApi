const blogPostService = require('../service/blogPostService');

const checkPostUserId = async (req, res, next) => {
    const userId = req.user;
    const { id } = req.params;
    const postUserId = await blogPostService.getPostById(id);
    if (userId !== postUserId.userId) return res.status(401).send({ message: 'Unauthorized user' });
    return next();
};

module.exports = checkPostUserId;