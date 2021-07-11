'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.room.hasMany(models.platform, {
        foreignKey: "room_id"
      });
      models.room.belongsTo(models.user, {
        foreignKey:"user_id"
      });
    }
  };
  room.init({
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    member_limit: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    language: DataTypes.STRING,
    annual_min: DataTypes.INTEGER,
    annual_max: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};