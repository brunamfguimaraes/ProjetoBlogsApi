// const Joi = require('joi');
// const { Categories } = require('../models');

//   const createCategory = async (name) => {
//     const schema = Joi.object({
//       name: Joi.string().required(),
//   }).validate({ name });
//   console.log(name);
//     if (schema.error) return { message: schema.error.message, status: 400 };
//     const { id } = await Categories.create({ name });
//     return { id, name };
//     };
      
//   const getAllCategory = async () => Categories.findAll();

//   module.exports = { createCategory, getAllCategory };