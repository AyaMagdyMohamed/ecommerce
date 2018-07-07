
const db = require('../dbConnection')
const Sequelize = require('sequelize')
const relations = require('../models/relations')
const customerModel = relations.customerModel
const orderModel = relations.orderModel 

const findCustomerOrders = function (page, limit, customerId) {
    limit = parseInt(limit)
    var offset = limit*(page-1);
  return  orderModel.findAndCountAll({
   include: [{ model: customerModel, where: { id: customerId }}] ,
     offset:offset,
     limit: limit
    
   
  })
    .then((data) => {
      let pages = Math.ceil(data.count / limit); 
      var objRes = {'result': data.rows, 'count': data.count, 'pages': pages}
       return objRes ;
    })
    .catch(function (error) {
        console.log("err", error)
         throw error
  });
}


module.exports = {
    findCustomerOrders: findCustomerOrders
}
