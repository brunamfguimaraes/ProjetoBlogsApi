module.exports = (sequelize, dataTypes) => {
const User = sequelize.define('User', {
displayName: dataTypes.STRING,
email: dataTypes.STRING,
password: dataTypes.STRING,
image: dataTypes.STRING,
},
{
timestamps: false,
});

User.associate = (models) => {
    User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'posts' });
};

return User;
};
