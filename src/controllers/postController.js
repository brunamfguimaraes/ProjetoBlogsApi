const PostService = require('../services/postService');
const codes = require('../util/httpCodes');

const createPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;

    const post = await PostService.createPost(title, content, categoryIds, userId);

    return res.status(codes.created).json(post);
  } catch (err) {
    return next(err);
  }
};

// const getCategories = async (_req, res, next) => {
//   try {
//     const categories = await CategoryService.getCategories();

//     return res.status(codes.ok).json(categories);
//   } catch (error) {
//     console.log(error);
//     return next(error);
//   }
// };

module.exports = {
  createPost,
  // getCategories,
};