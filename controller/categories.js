const { serviceCreateCategory } = require('../service/serviceCategory');

const createCategory = async (req, res) => {
    // const result = await serviceCreateCategory(req, res);
    const { name } = req.body;
    res.status(201).json(req);
};

module.exports = { createCategory };
