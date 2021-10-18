const { postPostServices } = require('../services/post');

const STATUS = {
  OK: 201,
};

const postPost = async (req, res) => {
  const answer = await postPostServices(req);
  if (answer.err) {
    return res.status(answer.err).json(answer);
  }
  return res.status(STATUS.OK).json(answer);
};

module.exports = {
  postPost,
};