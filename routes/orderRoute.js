const express = require('express')
const router = express.Router()
const sequelize = require('../dbConnection.js')
const Sequelize = require('sequelize')
const httpStatus = require('http-status')
var bodyParser = require('body-parser')
var orderController = require('../controllers/orderController')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.route('/').post(function (req, resp) {
    console.log(req.body)
     var customerId = req.body.customerId
     var telephone = req.body.telephone
     var address = req.body.address
    
    orderController.submitOrder(address, telephone, customerId).then(data => resp.json({"credit": data.storeCredit})).catch(err => {  
      resp.status(httpStatus.INTERNAL_SERVER_ERROR).json("err")
    }) 
   
})


  

module.exports = router
