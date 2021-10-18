const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  { 
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });
  // https://cursos.alura.com.br/forum/topico-renomear-as-colunas-createdat-e-updatedat-130933

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
  };

  return blogPost;
};

module.exports = BlogPost;
