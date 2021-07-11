'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class platform extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.platform.hasMany(models.member, {
        foreignKey: "platform_id"
      });

      models.platform.belongsTo(models.room, {
        foreignKey:"room_id"
      });
    }
  };
  platform.init({
    room_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    platform_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'platform',
  });
  return platform;
};