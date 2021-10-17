const { BlogPost } = require('../models');
// const { User } = require('../models');
require('dotenv').config();

// const createBlogPost = async (req, res) => {
//     const { title, categoryIds, content } = req.body;
//     console.log(req.user);
//     const { email } = req.user.data;
//     const { id: userId } = await User.findOne({ where: { email } });
//     const { dataValues: { id } } = await BlogPost.create({ title, categoryIds, content, userId });
//     if (!id) {
//         return res.status(400).json({ message: '"name" is required' });
//     }
//     return res.status(201).json({ id, title, content, userId });
// };

const getAllBlogPosts = async () => {
    const check = await BlogPost.findAll();
    return check;
};

module.exports = { getAllBlogPosts };