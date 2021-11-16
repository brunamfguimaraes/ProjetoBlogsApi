const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
    underscored: true,
  });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return blogPosts;
};

module.exports = BlogPosts;
