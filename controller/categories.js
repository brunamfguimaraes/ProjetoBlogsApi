const { serviceCategoryCreate, serviceCategoryList } = require('../services/categories');

const controllerCategoryCreate = async (req, res) => {
  const categoryReceived = req.body;
  const result = await serviceCategoryCreate(categoryReceived);
  if (result.err) {
        const { code, err } = result;
        return res.status(code).json(err);
        }
  const { code, categoryInserted } = result;
   return res.status(code).json(categoryInserted);
};

const controllerCategoryList = async (req, res) => {
  const result = await serviceCategoryList();
  const { code, allCategory } = result;
  return res.status(code).json(allCategory.message);
};

module.exports = {
  controllerCategoryCreate,
  controllerCategoryList,
};