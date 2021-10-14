const Categorie = (sequelize, DataTypes) => {
  const categorie = sequelize.define('Categorie', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'Categories',
    });
    // categorie.associate = (models) => {
    //   user.hasMany(models.Post,
    //     { foreignKey: 'user_id', as: 'posts' });
    // };
  return categorie;
};

module.exports = Categorie;