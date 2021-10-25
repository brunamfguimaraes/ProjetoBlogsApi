const jwt = require('jsonwebtoken');
const { BlogPosts, User } = require('../models');

const create = async (req, res) => {
    const response = await BlogPosts.create(req.body);
    const { id } = jwt
    .verify(req.headers.authorization, process.env.SECRET);
    res.status(201).json({ userId: id, ...response.dataValues });
};

const getAll = async (req, res) => {
    const response = await BlogPosts.findAll({ include: { model: User, as: 'user' } });
    res.status(200).json(response);
};

module.exports = {
    create,
    getAll,
};