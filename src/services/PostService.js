const { postValidator,
        categoryValidator,
        changeValidator,
      } = require('../validators/PostValidator');
const { BlogPost, User, Category } = require('../../models');

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

  return BlogPost.create({ title, userId, content });
}; 

const getPosts = async () => BlogPost.findAll({ 
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ], 
});

const getPost = async (id) => {
  const posted = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ], 
  });

  if (!posted) {
    return { message: 'Post does not exist' };
  }

  return posted; 
};

const changePost = async ({ title, content, postId, userId, categoryIds }) => {
  if (categoryIds) {
    return { message: 'Categories cannot be edited' };
  }

  const fields = changeValidator({ title, content });

  if (fields.message) {
    return fields;
  }

  const posted = await BlogPost.findByPk(postId);

  if (posted.userId !== userId) {
    return { message: 'Unauthorized user', unauthorized: true };
  }

  await BlogPost.update({
    title,
    content,
    updated: Date.now() },
    { where: { id: postId, userId },
  });

  return getPost(postId);
};

const deletePost = async ({ userId, postId }) => {
  const posted = await BlogPost.findByPk(postId);

  if (!posted) {
    return { message: 'Post does not exist' };
  }

  if (posted.userId !== userId) {
    return { message: 'Unauthorized user', unauthorized: true };
  }

  return BlogPost.destroy({ where: { id: postId } });
};

module.exports = {
  newPost,
  getPosts,
  getPost,
  changePost,
  deletePost,
};
