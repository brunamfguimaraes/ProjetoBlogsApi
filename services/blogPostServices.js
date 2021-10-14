const { BlogPost, PostsCategory } = require('../models');

const createPost = async (newPost) => {
  const { userId, title, categoryIds, content } = newPost;
  const published = new Date();
  const updated = published;
  const { id } = await BlogPost.create({ title, content, userId, published, updated });
  await Promise.all(categoryIds
  .map((categoryId) => PostsCategory
    .create({ postId: id, categoryId })));
  return { id, userId, title, content };
};

module.exports = {
  createPost,
};