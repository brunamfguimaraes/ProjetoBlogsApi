const BlogPost = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  { 
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return blogpost;
};

module.exports = BlogPost;

// hasOne
// belongsTo
// hasMany
// belongsToMany
// No caso de relacionamentos 1:1, utilizamos os métodos hasOne e belongsTo . A tradução literal desses métodos facilita o seu entendimento.
// hasOne = tem um
// belongsTo = pertencente a