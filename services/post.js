const { BlogPost, Category, User, PostCategory } = require('../models');
const { bodyPostValidator, checkCategories } = require('./postValidator');
// const MyError = require('./errorClass');

async function createPost(post, user) {
  await bodyPostValidator(post);
  await checkCategories(post.categoryIds);
  const result = await BlogPost.create({
    title: post.title,
    content: post.content,
    userId: user.id,
    published: Date.now(),
    updated: Date.now(),
  });

  const promises = post.categoryIds.map(async (categoryId) => PostCategory.create({
    postId: result.id,
    categoryId,
  }));

  Promise.all(promises);

  return result;
}

async function getPosts() {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  console.log('services');
  return posts;
}

module.exports = {
  createPost,
  getPosts,
};