'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  students.init({
    name:DataTypes.STRING,
    email:DataTypes.STRING,
    mobile_no:DataTypes.INTEGER,
    branch:DataTypes.STRING,
    rollno:DataTypes.INTEGER,
    PRN:DataTypes.STRING,
    status:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};