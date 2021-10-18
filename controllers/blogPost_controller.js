const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    // const { id } = req.user;
    const { id: userId } = req.user;
    console.log(req.user, 'controller');
    const { id } = await BlogPost.create({ title, content, categoryIds, userId });

   // console.log('COMEÇA AQUI', post, 'post');
 
     return res.status(201).json({ title, content, categoryIds, userId, id });
 };

 const getAllPosts = async (req, res) => {
    const posts = await BlogPost.findAll({
        include: [{ model: User, as: 'user' }, 
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