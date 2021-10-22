// const status401 = 401;
const status400 = 400;
// const status201 = 201;
// const status409 = 409;

const verifyTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(status400).json({ message: '"title" is required' });
  }
  next();
};

const verifyContent = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(status400).json({ message: '"content" is required' });
  }
  next();
};

const verifyCategoryIds = (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) {
    return res.status(status400).json({ message: '"categoryIds" is required' });
  }
  next();
};

module.exports = {
  verifyTitle,
  verifyContent,
  verifyCategoryIds,
};