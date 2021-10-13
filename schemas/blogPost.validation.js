const verifyCategoryName = (name) => {
  if (!name) {
    const error = new Error('"name" is required');
    error.code = 400;

    throw error;
  }
  return true;
};

module.exports = { verifyCategoryName };
