const {Sequelize, DataTypes}= require('sequelize');

module.exports = (Sequelize, DataTypes) =>{
    const Items = Sequelize.define(
        'items',{
          id_items: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
          },
          name_items:{
            type: DataTypes.STRING,
          },
          price:{
            type: DataTypes.INTEGER
          },
          createdAt:{
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt:{
            type: DataTypes.DATE,
            allowNull: false
          }
        },{
            tableName: "items"
        }
    );
    return Items;
}