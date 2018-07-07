/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('order', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
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
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: '0',
        field: 'total'
      },
      address: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: 'address'
      },
      telephone: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'telephone'
      }
    }, {
      tableName: 'Order'
    });
  };
  