const { BlogPost } = require('../models/index');

const createBlogPost = ({ content, title, userId }) => BlogPost.create({ content, title, userId });

module.exports = { createBlogPost };