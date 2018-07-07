
const db = require('../dbConnection')
const Sequelize = require('sequelize')
const relations = require('../models/relations')
const cartModel = relations.cartModel
const itemModel = relations.itemModel

const addItemToCart = function (customerId, itemId, quantity) {
 
    var entity = {customerId: customerId, itemId: itemId, quantity: quantity}
   return cartModel.create(entity).then(data=>{
        return data
    }).catch(err=>{
        return err
    })
}

const deleteItemFromCart = function(condition){
    return cartModel.destroy({
            where: condition
          }).then(result => { return result }).catch(err => { throw err })
}

const cartDetail = function(condition){

    return cartModel.findAll({where : condition , include: [{model:itemModel}]}).then(data=>{
        return data
    }).catch(err=> {throw err})
}

const totalPrice = function(data){

    var total = 0;
    for (var i = 0;i<data.length;i++){
        var quantity = data[i].quantity
        var price = data[i].item.price;
        total += (price*quantity) 
    }

    return total
}

const editItemInCart = function(condition, quantity){
    
    return cartModel.findOne({where: condition}).then(data=>{
        if (data){
            return cartModel.update({quantity: quantity}, {where: condition})
        }
        else{
             var obj = Object.assign(condition, {quantity: quantity})
            return cartModel.create(obj).then(data=>{
                data = JSON.stringify(data)
                data = JSON.parse(data)
                return data
            })
        }
    }).catch(err=> {throw err})
}

module.exports = {
    addItemToCart: addItemToCart,
    deleteItemFromCart: deleteItemFromCart, 
    editItemInCart:editItemInCart, 
    cartDetail: cartDetail,
    totalPrice: totalPrice
}
