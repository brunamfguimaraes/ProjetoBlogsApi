'use strict';
module.exports = {
  up: async (queryInterface, Seq) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Seq.INTEGER
      },
      title: {
        allowNull: false,
        type: Seq.STRING
      },
      content: {
        allowNull: false,
        type: Seq.STRING
      },
      userId: {
        allowNull: false,
        type: Seq.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Seq.DATE,
        defaultValue: Seq.literal('CURRENT_TIMESTAMP'),
        field: 'published'
      },
      updatedAt: {
        allowNull: false,
        type: Seq.DATE,
        defaultValue: Seq.literal('CURRENT_TIMESTAMP'),
        field: 'updated'
      }
    });
  },
  down: async (queryInterface, Seq) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
