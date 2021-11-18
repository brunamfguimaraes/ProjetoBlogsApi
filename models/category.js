const Category = (sequelize, DataTypes) => {
    const CategoryAtr = sequelize.define('Category', {
        name: DataTypes.STRING,
    }, { timestamps: false, tableName: 'Categories' });

    return CategoryAtr;
};

module.exports = Category;
