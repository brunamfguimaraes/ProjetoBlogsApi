const { servicePostCreated } = require('../services/post');

const controllerPostCreated = async (req, res) => {
  const { authorization } = req.headers;
  const postRecieved = req.body;
  const result = await servicePostCreated(postRecieved, authorization);
    const { code, postPublished } = result;
 return res.status(code).json(postPublished);
};

module.exports = {
  controllerPostCreated,
};