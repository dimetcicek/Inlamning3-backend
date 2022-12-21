const port = process.env.PORT || 5000
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const productsController = require('./controllers/productsController')
app.use('/api/products', productsController)

app.listen(port, () => console.log(`WebApi is running on http://localhost:${port}`))