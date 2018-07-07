
const db = require('../dbConnection')
const Sequelize = require('sequelize')
const itemModel = require('../models/Item')(db, Sequelize)



const findAllItems = function (page, limit) {
    limit = parseInt(limit)
    var offset = limit*(page-1);
  return  itemModel.findAndCountAll({  
     offset:offset,
     limit: limit,
     attributes: ['name', 'price', 'description']
  })
    .then((data) => {
      let pages = Math.ceil(data.count / limit); 
      var objRes = {'result': data.rows, 'count': data.count, 'pages': pages}
       return objRes ;
    })
    .catch(function (error) {
         throw error
  });
}


module.exports = {
    findAllItems: findAllItems
}
