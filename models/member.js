'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.member.belongsTo(models.user, {
        foreignKey:"user_id"
      });
      models.member.belongsTo(models.platform, {
        foreignKey:"platform_id"
      });
    }
  };
  member.init({
    platform_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    access_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'member',
  });
  return member;
};