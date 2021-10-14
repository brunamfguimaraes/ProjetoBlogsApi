module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define(
    'BlogPosts',
    {
        
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: { type: DataTypes.DATE },
      updated: { type: DataTypes.DATE },
    },
    { timestamps: false },
  );

  BlogPosts.associate = (models) => {
    BlogPosts.hasOne(models.Users, { foreignKey: 'id' });
  };
  
  return BlogPosts;
};
