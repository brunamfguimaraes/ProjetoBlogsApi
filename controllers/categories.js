const { Categories } = require('../models');

const create = async (req, res) => {
    const result = await Categories.create(req.body);

    return res.status(201).json(result);
};

const getAll = async (req, res) => {
    const result = await Categories.findAll();

    return res.status(200).json(result);
};

module.exports = { create, getAll };