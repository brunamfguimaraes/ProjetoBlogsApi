const User = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    },
    {
        timestamps: false,
        tableName: 'Users',
        underscored: true,
    });

    user.associate = (models) => {
        user.hasMany(models.BlogPost,
          { foreignKey: 'userId', as: 'blogPosts' });
    };

    return user;
};

module.exports = User;