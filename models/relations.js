

const db = require('../dbConnection')
const Sequelize = require('sequelize')
const cart = require('./Cart')(db, Sequelize)
const item = require('./Item')(db, Sequelize)
const customer = require('./Customer')(db, Sequelize)
const order = require('./Order')(db, Sequelize)

module.exports = {

  cartWithItem: cart.belongsTo(item, { foreignKey: 'itemId'}),
  cartWithCustomer : cart.belongsTo(customer, {foreignKey: 'customerId'}),
  customerWithOrder : order.belongsTo(customer, {foreignKey: 'customerId'}),
  cartModel: cart,
  itemModel: item, 
  orderModel : order,
  customerModel : customer
  
 
}
