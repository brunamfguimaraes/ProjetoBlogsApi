const { BlogPost, PostsCategory } = require('../../models');

const createPostService = async (body) => {
  const { categoryIds, title, content, userId } = body;
  const post = await BlogPost.create({
    title,
    content,
    userId,
    published: Date.now(),
    updated: Date.now(),
  });

  // for (let i = 0; i < categoryIds.length; i += 1) {
  //   PostCategory.create({ postId: post.id, categoryIds[i].id });
  // }

  categoryIds.forEach((categoryId) => {
    PostsCategory.create({ postId: post.id, categoryId });
  });

  return post;
};

module.exports = {
  createPostService,
};
