const { serviceCategoryCreate } = require('../services/categories');

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

module.exports = {
  controllerCategoryCreate,
};