
const Sequelize = require('sequelize')
const config = require('./config.js')
const sequelize = new Sequelize(config.DBName, config.DBUser, config.DBPassword, {
  host: config.DBHost,
  dialect: 'mysql',
  define: {
    
        freezeTableName: true,
        timestamps: false
      },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

module.exports = sequelize
