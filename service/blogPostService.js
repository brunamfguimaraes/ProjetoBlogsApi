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

module.exports = { createBlogPost, getAllPosts };