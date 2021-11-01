const CANNOT_EDIT_CATEGORIES = {
  error: {
    status: 400,
    message: 'Categories cannot be edited',
  },
};

const INVALID_FIELDS = {
  error: {
    status: 400,
    message: 'Invalid fields',
  },
};

module.exports = {
  CANNOT_EDIT_CATEGORIES,
  INVALID_FIELDS,
};