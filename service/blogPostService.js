const { BlogPost, User, Category } = require('../models/index');

const createBlogPost = ({ content, title, userId }) => BlogPost.create({ content, title, userId });

const getAllPosts = () => BlogPost.findAll(
    {
        include: [
          { model: User, as: 'user' },
          { model: Category, as: 'categories' },
        ],
    },
);

const getPostById = (id) => BlogPost.findOne({
        where: { id },
        include: [
          { model: User, as: 'user' },
          { model: Category, as: 'categories' },
        ],
      });

const checkIfPostExist = (id) => BlogPost.findOne({ where: { id } });

const updatePost = ({ content, title, id }) => BlogPost.update(
    { title, content },
    { where: { id } },
    ).then(async () => {
        const postUpdated = await BlogPost.findOne({ 
          where: { id },
          include: [
            { model: Category, as: 'categories' },
        ] });
        return postUpdated;
    });

const deletePost = (id) => BlogPost.destroy({ where: { id } });

module.exports = { 
    createBlogPost,
    getAllPosts,
    getPostById,
    checkIfPostExist,
    updatePost,
    deletePost };