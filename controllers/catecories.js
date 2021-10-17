const { postCategoriesServices } = require('../services/categories');

const STATUS = {
  OK: 201,
};

const postCategories = async (req, res) => {
  const answer = await postCategoriesServices(req);
  if (answer.err) { 
    return res.status(answer.err).json(answer); 
  }
  return res.status(STATUS.OK).json(answer);
};

module.exports = {
  postCategories,
};