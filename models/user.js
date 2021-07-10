'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.member, {
        foreignKey: "user_id"
      });
      models.user.hasMany(models.room, {
        foreignKey: "user_id"
      });
    }
  };
  user.init({
    github_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    annual: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};