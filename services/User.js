const { User, BlogPost } = require('../models');
const Error = require('../utils/createObjError');

const findAll = () =>
  User.findAll({
    include: { model: BlogPost, as: 'posts' },
  });

const getUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return Error.notFound('User does not exist');
  return user;
};

const create = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });
  if (user) return Error.conflict('User already registered');
  return User.create({ displayName, email, password, image });
};

const destroy = async (user) => User.destroy({ where: { id: user.id } });

module.exports = {
  create,
  findAll,
  getUser,
  destroy,
};
