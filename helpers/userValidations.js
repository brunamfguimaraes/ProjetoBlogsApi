const displayNameValidate = (displayName) => {
  if (displayName.length < 8) {
    return { isError: true, message: '"displayName" length must be at least 8 characters long' };
  }
  return { isError: false, message: 'ok' };
};

module.exports = {
  displayNameValidate,
};