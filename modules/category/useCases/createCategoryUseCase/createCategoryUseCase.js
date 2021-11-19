const Joi = require('joi');

const { create } = require('../../repositories/CategoryRepository');

const validateAuth = require('../../../../middlewares/validateAuth');

const errorMessage = (code, message) => ({
  code,
  message,
});

const validateCategories = (data) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate(data);

  if (error) {
    const { message } = error.details[0];
    throw errorMessage('BAD_REQUEST', message);
  }
};

  const createCategory = async (auth, data) => {
    await validateAuth(auth);

    validateCategories(data);

    console.log(data);

    const categories = await create(data);

    return categories;
  };

module.exports = createCategory;
