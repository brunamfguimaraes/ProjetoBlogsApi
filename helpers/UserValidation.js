const validateDisplayName = (displayName) => {
  if (displayName.length < 8) {
    return { fieldError: true, message: '"displayName" length must be at least 8 chracters long' };
  }
  return { fieldError: false };
};

module.exports = { validateDisplayName };