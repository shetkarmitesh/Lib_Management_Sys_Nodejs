'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('issued_books_records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER,
        references:{
          model:{tableName:'students'},
          key:'id'
        },
        allowNull: false,
      },
      book_id: {
        type: Sequelize.INTEGER,
        references:{
          model:{tableName:'books'},
          key:'id'
        }
        ,allowNull: false,
      },
      issued_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      expected_return_date: {
        type: Sequelize.DATE
        ,allowNull: false,

      },
      actual_return_date: {
        type: Sequelize.DATE
        ,allowNull: true,

      },
      penulty: {
        type: Sequelize.INTEGER
        ,allowNull: true,

      },
      status: {
        type: Sequelize.ENUM("pending","issued","lost","due","returned")
        ,allowNull: false,
        defaultValue:"pending"

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
    await queryInterface.dropTable('issued_books_records');
  }
};