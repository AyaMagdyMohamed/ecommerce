/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('item', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'name'
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: 'description'
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'price'
      }
    }, {
      tableName: 'Item'
    });
  };
  