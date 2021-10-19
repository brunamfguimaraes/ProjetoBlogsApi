module.exports = (sequelize, dataTypes) => {
const Category = sequelize.define('Category', {
name: dataTypes.STRING,
},
{
timestamps: false,
});
return Category;
};
