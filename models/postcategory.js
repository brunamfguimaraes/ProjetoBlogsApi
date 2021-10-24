// Source: https://app.betrybe.com/course/back-end/arquitetura-solid-e-orm/orm-associations/043e2e8a-c28e-4b95-a949-b7c43221ca8d/conteudos/e7db80cd-913f-454d-bac0-93e6be7ad660/relacionamentos-nn/a5fedf2e-affd-41db-84b4-1a08e6d520a3?use_case=side_bar

module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {},
    { timestamps: false, tableName: 'PostsCategories' });
    // Comments: TableName usado para indicar ao Model o nome correto da tabela no banco de dados, criada como "PostsCategories" de acordo com requisitos anteriores.

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId', // Comments: Por padrão seria "blogPostId", mas foi criado como "postId" conforme requisitos anteriores.
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId', // Comments: Por padrão seria "blogPostId", mas foi criado como "postId" conforme requisitos anteriores.
    });
  };

  return PostCategory;
};
