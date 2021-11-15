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
    // Post.belongsTo(models.User, { foreingKey: 'userId', as: 'user' });
    models.User.hasMany(Post, { as: 'user', foreingKey: 'userId' });
  };

  // https://stackoverflow.com/questions/44070808/hasmany-called-with-something-thats-not-an-instance-of-sequelize-model

  return Post;
};
