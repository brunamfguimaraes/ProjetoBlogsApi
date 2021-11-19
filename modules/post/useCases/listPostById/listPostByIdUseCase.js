const validateAuth = require('../../../../middlewares/validateAuth');
const { listPostById } = require('../../repositories/postRepository');

const errorMessage = (code, message) => ({
  code,
  message,
});

const listById = async (auth, id) => {
  await validateAuth(auth);

  const post = await listPostById(id);

  if(!post) {
    throw errorMessage('NOT_FOUND', 'Post does not exist');
  };

  return post
}

module.exports = listById;