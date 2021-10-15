module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('BlogPosts', {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      underscored: true,
      tableName: 'BlogPosts',
      timestamps: false,
    });

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return Posts;
};