'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.users, {as: 'users', foreignKey: 'id_user'})
    }
  }
  items.init({
    name_item: DataTypes.STRING,
    price: DataTypes.INTEGER,
    // id_user: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'users',
    //     key: 'id'
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE'
    // }
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};