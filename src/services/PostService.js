const { postValidator, categoryValidator } = require('../validators/PostValidator');
const { Post } = require('../../models');

const newPost = async (post) => {
  const posted = postValidator(post);

  if (posted.message) {
    return posted;
  }

  const withoutCategory = await categoryValidator(post.categoryIds);

  if (withoutCategory) {
    return { message: '"categoryIds" not found' };
  }

  const { title, userId, content } = post;

  return Post.create({ title, userId, content });
}; 

module.exports = {
  newPost,
};
