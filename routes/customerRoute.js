const express = require('express')
const router = express.Router()
const sequelize = require('../dbConnection.js')
const Sequelize = require('sequelize')
const httpStatus = require('http-status')
var bodyParser = require('body-parser')
var customerController = require('../controllers/customerController')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.route('/:page/:limit/:customerId').get(function (req, resp) {

    var page = req.params.page; //pageNumber
    var limit = req.params.limit; //max elements per page
    var customerId = req.params.customerId
    customerController.findCustomerOrders(page, limit, customerId).then(data=>{
        resp.send(data)
    }).catch(err=> resp.json('err'))
   
})


module.exports = router
