const { BlogPost } = require('../models');
const { Category } = require('../models');
const { User } = require('../models');
require('dotenv').config();

const createBlogPost = async (req, res) => {
    const { title, categoryIds, content } = req.body;
    const { email } = req.user.data;
    const { id: userId } = await User.findOne({ where: { email } });
    const { dataValues: { id } } = await BlogPost.create({ title, categoryIds, content, userId });
    if (!id) {
        return res.status(400).json({ message: '"name" is required' });
    }
    return res.status(201).json({ id, title, content, userId });
};

const getAllBlogPosts = async () => {
    console.log('service Post');
    const check = await BlogPost.findAll({
        include: [{ model: User, as: 'user' },
        { model: Category, as: 'categories' }],
    });
    // console.log('check PostService', check, 'check postService');
    return check;
};

module.exports = { createBlogPost, getAllBlogPosts };