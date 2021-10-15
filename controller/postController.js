// const jwt = require('jsonwebtoken');
const postService = require('../service/postService');

const createPost = async (req, res) => {
    try { 
        const { data: { id } } = req.user;
        const result = await postService.createPost(req.body, id);
       // console.log('result', result);
        if (typeof (result) === 'string') {
            return res.status(400).json({ message: result });
        }
        if (result.dataValues.title === req.body.title) {
        return res.status(201).json(result);
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { createPost };