'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class issued_books_records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  issued_books_records.init({
    issued_date: DataTypes.DATE,
    expected_return_date: DataTypes.DATE,
    actual_return_date: DataTypes.DATE,
    student_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    penulty:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'issued_books_records',
  });
  return issued_books_records;
};