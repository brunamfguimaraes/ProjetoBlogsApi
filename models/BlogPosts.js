module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define(
    'BlogPosts',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    { timestamps: false },
  );

  BlogPosts.associate = (models) => {
    BlogPosts.hasOne(models.Users, { foreignKey: 'userId' });
  };
  
  return BlogPosts;
};
