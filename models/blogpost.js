const BlogPost = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return blogpost;
};

module.exports = BlogPost;