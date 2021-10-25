const jwt = require('jsonwebtoken');
const { BlogPosts } = require('../models');

const create = async (req, res) => {
    const response = await BlogPosts.create(req.body);
    const { id } = jwt
    .verify(req.headers.authorization, process.env.SECRET);
    res.status(201).json({ userId: id, ...response.dataValues });
};

module.exports = {
    create,
};