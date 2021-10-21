function nameValidation(name) {
  if (!name) {
    const error = new Error('"name" is required');
    error.code = 400;
    throw error;
  }
}

module.exports = {
  nameValidation,
};
