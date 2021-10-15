const { BlogPost } = require('../models');

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    // const { id } = req.user;
    const { id: userId } = req.user;
    console.log(req.user, 'controller');
    const { id } = await BlogPost.create({ title, content, categoryIds, userId });

   // console.log('COMEÇA AQUI', post, 'post');
 
     return res.status(201).json({ title, content, categoryIds, userId, id });
 };

module.exports = {
    createPost,
};