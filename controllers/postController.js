const { StatusCodes } = require('http-status-codes');
const { createPostServices } = require('../services/postServices');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  try {
    const response = await createPostServices({ title, content, categoryIds, id });
    console.log(response);
    if (response.isError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: response.message });
    } 
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = { createPost };