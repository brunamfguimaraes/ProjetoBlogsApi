const { User, BlogPost } = require('../models');

const HTTP = {
  Unauthorized: 401,
  NotFound: 404,
};

// Verifica se o usuário é o autor para poder deletar
const validateProperty = async (req, res, next) => {
  const { email } = req;
  const { id } = req.params;

  try {
    const post = await BlogPost.findOne({ where: { id } });
    // Busca o usuário com o id cadastrado no post
    const property = await User.findOne({ where: { id: post.userId } });
    // Verifica se o email de quem esta deletando corresponde ao autor do post
    if (property && email === property.email) return next();

    return res.status(HTTP.Unauthorized).json({ message: 'Unauthorized user' });
  } catch (_e) {
    return res.status(HTTP.NotFound).json({ message: 'Post does not exist' });
  }
};

module.exports = validateProperty; 