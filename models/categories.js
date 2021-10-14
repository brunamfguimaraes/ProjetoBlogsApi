const Categories = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('Category', {
        name: DataTypes.STRING,
    },
    { timestamps: false, tableName: 'Categories' });
    
    return UserModel;
};

module.exports = Categories;