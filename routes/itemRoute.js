const express = require('express')
const router = express.Router()
const sequelize = require('../dbConnection.js')
const Sequelize = require('sequelize')
const httpStatus = require('http-status')
var bodyParser = require('body-parser')
var itemController = require('../controllers/itemController')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.route('/:page/:limit').get(function (req, resp) {

    var page = req.params.page; //pageNumber
    var limit = req.params.limit; //max elements per page
    itemController.findAllItems(page, limit).then(data=>{
        resp.send(data)
    }).catch(err=> resp.json('err'))
   
})


module.exports = router
