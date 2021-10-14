const Categorie = (sequelize, DataTypes) => {
    const categorie = sequelize.define('Categorie', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
    },
    {
        timestamps: false,
        tableName: 'Categories',
    });

    Categorie.associate = (models) => {
        Categorie.hasMany(models.PostsCategory,
          { foreignKey: 'categoryId', as: 'category' });
    };

    return categorie;
};

module.exports = Categorie;