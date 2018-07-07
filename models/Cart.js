/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('cart', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      itemId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Item',
          key: 'id'
        },
        field: 'item_id'
      },
      customerId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Customer',
          key: 'id'
        },
        field: 'customer_id'
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1,
        field: 'quantity'
      }
    }, {
      tableName: 'Cart'
    });
  };
  