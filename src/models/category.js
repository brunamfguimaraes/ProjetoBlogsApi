const Category = (seq, DataTypes) => {
  const categories = seq.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
  });

  return categories;
};

module.exports = Category;