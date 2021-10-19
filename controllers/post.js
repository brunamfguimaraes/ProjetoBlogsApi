const { postPostServices, getAllPostServices } = require('../services/post');

const STATUS = {
  OK: 201,
  OKK: 200,
};

const postPost = async (req, res) => {
  const answer = await postPostServices(req);
  if (answer.err) {
    return res.status(answer.err).json(answer);
  }
  return res.status(STATUS.OK).json(answer);
};

const getAllPost = async (req, res) => {
  const answer = await getAllPostServices(req);
  return res.status(STATUS.OKK).json(answer);
};

module.exports = {
  postPost,
  getAllPost,
};