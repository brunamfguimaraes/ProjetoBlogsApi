module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreingKey: true, defaultValue: 1 },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreingKey: 'userId', as: 'user' });
  };

  return Post;
};
