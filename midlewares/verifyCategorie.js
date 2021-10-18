const CategorieNameError = { message: '"name" is required' };
function validateCategorieName(req, res, next) {
    const { name } = req.body;
    if (!name) return res.status(400).json(CategorieNameError);
    next();
  }

module.exports = { validateCategorieName };
