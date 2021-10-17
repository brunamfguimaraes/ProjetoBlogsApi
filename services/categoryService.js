const isValidName = (name) => {
  if (!name) {
    return '"name" is required';
  }

  return false;
};

module.exports = { isValidName };