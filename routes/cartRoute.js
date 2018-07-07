const express = require('express')
const router = express.Router()
const sequelize = require('../dbConnection.js')
const Sequelize = require('sequelize')
const httpStatus = require('http-status')
var bodyParser = require('body-parser')
var cartController = require('../controllers/cartController')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.route('/').post(function (req, resp) {
    console.log(req.body)
     var customerId = req.body.customerId
     var itemId = req.body.itemId
     var quantity = req.body.quantity
    
    cartController.addItemToCart(customerId, itemId, quantity).then(data => resp.send(data)).catch(err => {  
      resp.status(httpStatus.INTERNAL_SERVER_ERROR).json("err")
    }) 
   
})

router.route('/:customerId/:itemId').delete(function (req, resp) {
    var condition = {customerId: req.params.customerId, itemId: req.params.itemId}
    cartController.deleteItemFromCart(condition).then(result=>{
        if (result) {
            resp.json('Deleted Successfully')
          } else {
          
            resp.status(httpStatus.NOT_FOUND).json('notFound')
          }    
    }).catch(err => {  
            resp.status(httpStatus.INTERNAL_SERVER_ERROR).json("err")
          }) 
  })

router.route('/:customerId/:itemId/:quantity').put(function(req,resp){

    var condition = {customerId: req.params.customerId, itemId: req.params.itemId}
    cartController.editItemInCart(condition,req.params.quantity).then(data=>{
        if(Array.isArray(data)){
            console.log('data', data)
            resp.status(200);
            resp.json("Successfully updated");
        }else{
            resp.status(200);
            resp.json("Successfully inserted");
        }
    }).catch(err=>{
        resp.json("err")
    }
    )
})

router.route('/cartDetail/:customerId').get(function(req, resp){
    var condition = {customerId: req.params.customerId}
    var total = 0;
    cartController.cartDetail(condition).then(data=>{
        data = JSON.stringify(data)
        data = JSON.parse(data)
        total =  cartController.totalPrice(data)
        resp.send({items:data, totalPrice: total})
    }).catch(err=>{
        resp.send(err)
    })

})
  

module.exports = router
