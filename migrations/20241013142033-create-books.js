'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      book_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      publication: {
        type: Sequelize.STRING
      },
      ISBN: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      }, status: {
        type: Sequelize.ENUM("not available","available")
        ,allowNull: false,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};