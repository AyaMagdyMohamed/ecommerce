
const db = require('../dbConnection')
const Sequelize = require('sequelize')
const relations = require('../models/relations.js')
const cartController = require('./cartController.js')
const cartModel = relations.cartModel
const itemModel = relations.itemModel
const orderModel = relations.orderModel
const customerModel = relations.customerModel

const submitOrder = function(address, telelephoneNumber, customerId) {

     var total = 0;
     var condition = {customerId, customerId}
    return  cartController.cartDetail(condition).then(function(data){
        data = JSON.stringify(data)
        data = JSON.parse(data)
        total =  cartController.totalPrice(data)
        var storeCredit = 0 
        console.log("total", total)
       return db.transaction(function (t) {
        return orderModel.create({
         customerId: customerId,
         total: total,
         address : address,
         telephone : telelephoneNumber

        }, {transaction: t}).then(function (order) {
          return customerModel.findOne({
            where: {
              id: customerId
            }
          }, {transaction: t})
        }).then(function(customer){
 
           customer =  JSON.stringify(customer)
           customer = JSON.parse(customer)
           console.log("customer", customer)
             var credit = customer.storeCredit - total
             var creditObj = {storeCredit:credit}
            return customerModel.update(creditObj,{  
                where: {
                  id: customerId
                }, 
               transaction: t
            })
        })
    }).then( function (result) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
              console.log("success transaction")
             return   customerModel.findOne({where: {id: customerId}}).then(data=>{
                   data = JSON.stringify(data)
                   data = JSON.parse(data)
                   return data
              })
             
          }).catch(function (err) {
              console.log("err", err)
            return err
          })
    })
}

module.exports = {

 submitOrder: submitOrder    

}