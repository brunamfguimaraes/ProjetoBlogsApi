const PostCategory = (sequelize, _Datatypes) => {
  const Xablau = sequelize.define('PostsCategory',
    {},
    { timestamps: false, tableName: 'PostsCategories' });

    Xablau.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'blogPosts',
        through: Xablau,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });

      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: Xablau,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
    };
  return Xablau;
};

// recebi ajuda do colega Jonathan Souza e Alexandre Damasceno para criar a esse model.
// eu estava confundindo as tabelas que seriam utilizadas, ao invés de usar a tabela de blogposts, estava usando a tabela Users.
// Também estava confundindo que a linha 7 e linha 14, onde as tabelas referenciam umas as outras, eu tava pondo 
// 'models.Category.belongsToMany(models.Category (quando era pra ser models.BlogPost, como está agora na linha 7, o mesmo ocorreu na linha 14.))
// No mais segui o conteúdo do course no link: https://app.betrybe.com/course/back-end/arquitetura-solid-e-orm/orm-associations/043[…]tos-nn/a5fedf2e-affd-41db-84b4-1a08e6d520a3?use_case=side_bar
module.exports = PostCategory;
