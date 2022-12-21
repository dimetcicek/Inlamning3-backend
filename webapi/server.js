require('dotenv').config()
const port = process.env.SERVER_PORT || 5000
const express = require('express')
const cors = require('cors')
const mongodb = require('./mongodb_server')
const app = express()
const bodyParser = require('body-parser');

let dev = false

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const productsController = dev ? require('./controllers/productsController_dev') : require('./controllers/productsController')
app.use('/api/products', productsController)

mongodb()

app.listen(port, () => console.log(`WebApi is running on http://localhost:${port}`))