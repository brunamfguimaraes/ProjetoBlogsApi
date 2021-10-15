// Comments: Lista de erros
const errors = {
  displayNameLength: '"DisplayName" length must be at least 8 characteres long',
};

// Comments: Valida se o campo displayName é uma string com no mínimo de 8 caracteres;.
const validateDisplayNameLength = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) return res.status(400).json({ message: errors.displayNameLength });

  next();
};

module.exports = {
  validateDisplayNameLength,
};