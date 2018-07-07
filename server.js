const express = require('express')
const app = express()

const itemRoute = require('./routes/itemRoute')
const cartRoute = require('./routes/cartRoute')
const orderRoute = require('./routes/orderRoute')
const customerRoute = require('./routes/customerRoute')

const prefix = '/api'


app.use(prefix + '/item',itemRoute)

app.use(prefix + '/cart',cartRoute)

app.use(prefix + '/order',orderRoute)

app.use(prefix + '/customer', customerRoute)



app.listen(8000, '0.0.0.0', function () {
  console.log('listening on *:8000')
})
