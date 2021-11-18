const { Router } = require('express');

const createController = require('../modules/category/useCases/createCategoryUseCase/createCategoryController');

const listController = require('../modules/category/useCases/listCategoryUseCase/listCategoryController');

const categoryRouter = Router();

categoryRouter.post('/', createController);
categoryRouter.get('/', listController);

module.exports = categoryRouter;