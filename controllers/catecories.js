const { postCategoriesServices, getCategoriesServices } = require('../services/categories');

const STATUS = {
  OK: 201,
  OKK: 200,
};

const postCategories = async (req, res) => {
  const answer = await postCategoriesServices(req);
  if (answer.err) { 
    return res.status(answer.err).json(answer); 
  }
  return res.status(STATUS.OK).json(answer);
};

const getCategories = async (req, res) => {
  const answer = await getCategoriesServices(req);
  if (answer.err) {
    return res.status(answer.err).json(answer);
  }
  return res.status(STATUS.OKK).json(answer);
};

module.exports = {
  postCategories,
  getCategories,
};