const { BlogPost } = require('../models');
const { Category } = require('../models');
const { User } = require('../models');
const { checkUpdateEntries } = require('../middlewares/postValidations');

const createPost = async (post, id) => {
    const postIn = {
        title: post.title,
        content: post.content,
        userId: id,
    };
    const result = await BlogPost.create(postIn);
    return result;
};

const findCategory = async (ids) => {
    const result = await ids.map((id) => Category.findOne({ where: { id } }));
    return Promise.all(result).then((values) => values);
};

const getAll = async () => {
    const result = await BlogPost.findAll({ 
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return result;
};

const getOne = async (id) => {
    const result = await BlogPost.findOne({ where: { id },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
  
    return result;
};

const updatePost = async ({ title, content, postId, userId, categoryIds }) => {
    if (categoryIds) return { message: 'Categories cannot be edited' };
  
    const entries = checkUpdateEntries({ title, content });
    if (entries.message) return entries;
  
    const post = await BlogPost.findByPk(postId);
    console.log(`post.userId: ${post.userId} userId: ${userId}`);
    if (post.userId !== userId) return { message: 'Unauthorized user', unauthorized: true };
  
     await BlogPost.update(
      { title, content, updated: Date.now() }, { where: { id: postId, userId } },
    );
  
    return getOne(postId);
};

const removePost = async ({ userId, postId }) => {
    const post = await BlogPost.findByPk(postId);
    if (!post) return { message: 'Post does not exist' };
    if (post.userId !== userId) return { message: 'Unauthorized user', unauthorized: true };
  
    return BlogPost.destroy({ where: { id: postId } });
  };

module.exports = {
    createPost,
    findCategory,
    getAll,
    getOne,
    updatePost,
    removePost,
};
