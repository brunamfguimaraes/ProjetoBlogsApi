const { BlogPost, Category, User } = require('../models');

const emptyFields = (field) => {
  if (field) {
  const err = { name: 'emptyError',
  message: `"${field}" is required` };
  throw err;
  }
  return false;
};

const invalidCategory = async (categoryArray) => {
  const category = categoryArray.map((id) => Category.findOne({ where: { id } }));
  const results = await Promise.all(category);
  const someInvalidCategory = results.some((result) => !result);
  return someInvalidCategory;
};

const createNewPost = async (title, content, userId) => {
  const post = await BlogPost.create({ title, content, userId });
  const { id } = post;
  return id;
};

const allPosts = async () => {
  const posts = await BlogPost.findAll({ include: [{ model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const onePost = async (id) => {
  const post = await BlogPost.findOne({ where: { id },
    include: [{ model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) {
    throw new Error('Post does not exist');
  }
  return post;
};

module.exports = { createNewPost, emptyFields, invalidCategory, allPosts, onePost };
