module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, defaultValue: 0, allowNull: false },
    content: { type: DataTypes.STRING, defaultValue: 0, allowNull: false },
    userId: { type: DataTypes.STRING, defaultValue: 0, allowNull: false },
    published: { type: DataTypes.DATE, defaultValue: 0, allowNull: false },
    updated: { type: DataTypes.DATE, defaultValue: 0, allowNull: false },
  },
  { timestamps: false, tableName: 'BlogPosts' });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return BlogPost;
};
