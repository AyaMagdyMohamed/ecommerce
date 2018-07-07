/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('customer', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'email'
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'last_name'
      },
      storeCredit: {
        type: DataTypes.INTEGER(100),
        allowNull: false,
        field: 'store_credit'
      }
    }, {
      tableName: 'Customer'
    });
  };
  