const jwt = require('jsonwebtoken');
const { BlogPost, User, Categories } = require('../models');

const create = async (req, res) => {
    const response = await BlogPost.create(req.body);
    const { id } = jwt
    .verify(req.headers.authorization, process.env.JWT_SECRET);
    return res.status(201).json({ userId: id, ...response.dataValues });
};

const getAll = async (req, res) => {
    const response = await BlogPost
    .findAll({ include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories,
        as: 'categories' },
    ] });
    return res.status(200).json(response);
};

module.exports = {
    create,
    getAll,
};