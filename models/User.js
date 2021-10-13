const User = (sequelize, dataType) => {
  const user = sequelize.define('User', {
  id: { type: dataType.INTEGER, primaryKey: true, autoIncrement: true },
  displayName: dataType.STRING,
  email: dataType.STRING,
  password: dataType.STRING,
  image: dataType.STRING,
  });
  user.associate = (model) => {
    user.hasMany(model.Blogpost, {
      foreignKey: 'userId', as: 'Posts',
    });
  };
  return user;
};

module.exports = User;