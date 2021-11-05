const { StatusCodes } = require('http-status-codes');

const BlogPost = require('../services/BlogPost');

const addNewPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const addedPost = await BlogPost.addNewPost(title, content, categoryIds, req.user);
  if (addedPost.errMsg) {
    return next({ codeErr: addedPost.codeErr, errMsg: addedPost.errMsg });
  }

  res.status(StatusCodes.CREATED).json(addedPost);
};

module.exports = {
  addNewPost,
};
