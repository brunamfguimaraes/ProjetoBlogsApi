const dataIsRequired = (data) => ({
    error: {
      status: 400,
      message: `"${data}" is required`,
    },
  });

module.exports = { dataIsRequired };