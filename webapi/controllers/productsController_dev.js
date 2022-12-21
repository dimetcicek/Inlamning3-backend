const express = require('express')
const controller = express.Router()
let products = require('../data/simulated_database')

controller.param("id", (httpRequest, httpResponse, next, id) => {
    httpRequest.product = products.find(product => product.id == id)
    next()
})

// http://localhost:5000/api/products
controller.route("/")
.get((httpRequest, httpResponse) => {
    httpResponse.status(200).json(products)
})
.post((httpRequest, httpResponse) => {
    let product = {
        id: products[products.length - 1]?.id > 0 ? products[products.length - 1].id + 1 : 1,
        name: httpRequest.body.name,
        category: httpRequest.body.category,
        price: httpRequest.body.price,
        rating: httpRequest.body.rating,
        img: httpRequest.body.img,
        title: httpRequest.body.title
    }

    products.push(product)
    httpResponse.status(201).json(product)
})

// http://localhost:5000/api/products/1
controller.route("/:id")
.get((httpRequest, httpResponse) => {
    if (httpRequest !== undefined && httpRequest.product !== undefined)
        httpResponse.status(200).json(httpRequest.product)
    else
        httpResponse.status(404).json()
})
.put((httpRequest, httpResponse) => {
    if (httpRequest != undefined && httpRequest.product !== undefined)
    {
        products.forEach(product => {
            if (product.id === httpRequest.product.id)
            {
                if (httpRequest.body.name)
                    product.name = httpRequest.body.name
                
                if (httpRequest.body.category)
                    product.category = httpRequest.body.category
                
                if (httpRequest.body.price)
                    product.price = httpRequest.body.price
                
                if (httpRequest.body.rating)
                    product.rating = httpRequest.body.rating
                
                if (httpRequest.body.img)
                    product.img = httpRequest.body.img

                if (httpRequest.body.title)
                    product.title = httpRequest.body.title
            }
        })

        httpResponse.status(200).json(httpRequest.product)
    }
    else
        httpResponse.status(404).json()
})
.delete((httpRequest, httpResponse) => {
    if (httpRequest != undefined && httpRequest.product !== undefined){
        products = products.filter(product => product.id !== httpRequest.product.id)
        
        httpResponse.status(204).json()
    }
    else
        httpResponse.status(404).json()
})

module.exports = controller