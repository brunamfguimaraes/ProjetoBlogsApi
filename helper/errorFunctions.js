const dataIsRequired = (data) => ({
    error: {
      status: 400,
      message: `"${data}" is required`,
    },
  });

const dataNotFound = (data) => ({
  error: {
    status: 404,
    message: `${data} does not exist`,
  },
});

module.exports = {
  dataIsRequired,
  dataNotFound,
};