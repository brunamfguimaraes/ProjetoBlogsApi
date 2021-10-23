const validateField = (field, fieldname) => {
  if (!field && field !== '') {
    return {
      error: {
        status: 400,
        message: `"${fieldname}" is required`,
      },
    };
  }

  if (field.length === 0) {
    return {
      error: {
        status: 400,
        message: `"${fieldname}" is not allowed to be empty`,
      },
    };
  }

  return { message: 'Succefull' };
};

module.exports = {
  validateField,
};