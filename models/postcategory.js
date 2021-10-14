module.exports = (sequelize, DataTypes) => {
  const postcategory = sequelize.define('postcategory', {},
  {
    timestamps: false,
  });

  return postcategory;
};