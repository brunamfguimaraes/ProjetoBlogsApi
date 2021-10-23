const BAD_REQUEST = 400;

// req 5
// Verifica se o campo name foi preenchido ao criar a categoria
const categorieNameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }

  next();
};

module.exports = { categorieNameValidation };
