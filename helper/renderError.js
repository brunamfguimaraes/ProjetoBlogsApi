const renderError = (error) => {
  const err = {
      message: error.message, 
  };
  return err;
};

module.exports = { renderError };