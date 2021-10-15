const validateTitle = (title) => {
  if (!title) {
    return { fieldError: true, message: '"title" is required' };
  }
  return { fieldError: false };
};

const validateContent = (content) => {
  if (!content) {
    return { fieldError: true, message: '"content" is required' };
  }
  return { fieldError: false };
};

const validateCategory = (categoryIds) => {
  if (!categoryIds) {
    return { fieldError: true, message: '"categoryIds" is required' };
  }

  return { fieldError: false };
};

module.exports = {  
  validateTitle,
  validateContent,
  validateCategory,
};