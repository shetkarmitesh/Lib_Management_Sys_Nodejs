'use strict';
const {
  Model,
  STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  books.init({
    book_id:DataTypes.INTEGER,
    title:DataTypes.STRING,
    author:DataTypes.STRING,
    publiction:DataTypes.STRING,
    ISBN:DataTypes.STRING,
    price:DataTypes.INTEGER,
    status:DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};