const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');
require('dotenv');

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    // const { id } = req.user;
    const { id: userId } = req.user;
    const { id } = await BlogPost.create({ title, content, categoryIds, userId });
    console.log(id, 'controller');

   // console.log('COMEÇA AQUI', post, 'post');
 
     return res.status(201).json({ title, content, categoryIds, userId, id });
 };

 const getAllPosts = async (req, res) => {
    const posts = await BlogPost.findAll({
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
   // https://stackoverflow.com/questions/42661141/findall-include-more-tables-on-sequelize-query
   // https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566 
   return res.status(200).json(posts);
 };

module.exports = {
    createPost,
    getAllPosts,
};