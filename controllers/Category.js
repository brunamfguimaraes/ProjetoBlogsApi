const { StatusCodes } = require('http-status-codes');
// https://www.npmjs.com/package/http-status-codes coisa boa viu
const category = require('../services/categorieService.js');

const newCategory = async (req, res) => {
    try {
        const result = await category.newCategoryService(req.body);
        if (result.isError) return res.status(result.status).json(result.err);
        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
};

// const test = async () => Categories.findAll();

const AllCategory = async (_req, res) => {
    try {
      const result = await category.allCategory();
      if (result.isError) return res.status(result.status).json(result.err);
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  };

module.exports = {
    newCategory,
    AllCategory,
};
