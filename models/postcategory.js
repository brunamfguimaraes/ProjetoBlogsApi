const PostCategory = (sequelize, _DataTypes) => {
  const postcategory = sequelize.define('PostCategory',
    {}, { timestamps: false });

  postcategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postcategory,
      foreignKey: 'blogpost_id',
      otherKey: 'id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: postcategory,
      foreignKey: 'id',
      otherKey: 'blogpost_id',
    });
  };

  return postcategory;
};

module.exports = PostCategory;
