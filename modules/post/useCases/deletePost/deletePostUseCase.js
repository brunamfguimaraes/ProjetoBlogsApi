const validateAuth = require('../../../../middlewares/validateAuth');
const { getOnlyId, excludePost } = require('../../repositories/postRepository');

const errorMessage = (code, message) => ({
  code,
  message,
});

const validateUserActions = async(id, dataId) => {
  const blogPost = await getOnlyId(id)

  console.log(dataId)
  console.log(blogPost.dataValues.userId)

  if(blogPost.dataValues.userId !== dataId) {
    throw errorMessage('UNAUTHORIZED', 'Unauthorized user')
  }
}

const deletePostUseCase = async (auth, id) => {
  const payload = await validateAuth(auth);

  const post = await getOnlyId(id);

  if(!post) {
    throw errorMessage('NOT_FOUND', 'Post does not exist');
  }

  await validateUserActions(id, payload.id);

  await excludePost(id);
}

module.exports = deletePostUseCase;