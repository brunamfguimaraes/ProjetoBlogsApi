// Comments: Lista de erros
const errors = {
  nameRequired: '"name" is required',
};

// Comments: Valida se o campo name foi informado na requisição de cadastro de categoria.
const validateCategoryNameWasInformed = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: errors.nameRequired });
  }

  next();
};
module.exports = { validateCategoryNameWasInformed };