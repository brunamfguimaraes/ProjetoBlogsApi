module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('PostsCategories',
      [
        {
          post_id: 1,
          categorie_id: 1,
        },
        {
          post_id: 2,
          categorie_id: 2,
        },

      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('PostsCategories', null, {});
  },
};
