const { StatusCodes } = require('http-status-codes');
// https://www.npmjs.com/package/http-status-codes coisa boa viu
const JOI = require('joi');
const { Categories } = require('../models');

const validateInputData = (data) =>
    JOI.object({
        name: JOI.string().required(),
    }).validate(data);

const newCategoryService = async (data) => {
    const { error } = validateInputData(data);
    // desestruturado msm da nada não
    if (error) {
        return {
            isError: true,
            err: { message: error.details[0].message },
            status: StatusCodes.BAD_REQUEST,
        };
    }

    const result = await Categories.create(data);
    return result;
};

const allCategory = async () => Categories.findAll();

module.exports = {
    newCategoryService,
    allCategory,
};
