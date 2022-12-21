const express = require('express')
const controller = express.Router()

const products = require('../schemas/productSchema')

controller.param("id", async (httpRequest, httpResponse, next, id) => {
    httpRequest.product = await products.findById(id)
    next()
})

// http://localhost:5000/api/products
controller.route("/")
.get(async (httpRequest, httpResponse) => {
    try
    {
        const allProducts = await products.find()
        httpResponse.status(200).json(allProducts)
    }
    catch (error)
    {
        httpResponse.status(400).json({ text: error })
    }
})
.post(async (httpRequest, httpResponse) => {
    const { name, category, price, rating, img, title } = httpRequest.body

    try
    {
        const product = await products.create({
            name,
            category,
            price,
            rating,
            img,
            title
        })
    
        if (product)
            httpResponse.status(201).json({ text: "Created product!" })
        else
            httpResponse.status(400).json({ text: "Failed to create product!" })
    }
    catch (error)
    {
        httpResponse.status(400).json({ text: `Failed to create product! Error: ${error}` })
    }
})

// http://localhost:5000/api/products/1
controller.route("/:id")
.get((httpRequest, httpResponse) => {
    try
    {
        if (httpRequest !== undefined && httpRequest.product !== undefined)
            httpResponse.status(200).json(httpRequest.product)
        else
            httpResponse.status(404).json()
    }
    catch (error)
    {
        httpResponse.status(400).json({ text: `Failed to get product! Error: ${error}` })
    }
    
})
.put(async (httpRequest, httpResponse) => {
    try
    {
        if (httpRequest != undefined && httpRequest.product !== undefined)
        {
            const { name, category, price, rating, img, title } = httpRequest.body

            await products.findByIdAndUpdate(httpRequest.params.id, {
                name: name ? name : httpRequest.product.name,
                category: category ? category : httpRequest.product.category,
                price: price ? price : httpRequest.product.price,
                rating: rating ? rating : httpRequest.product.rating,
                img: img ? img : httpRequest.product.img,
                title: title ? title : httpRequest.product.title,
            })
            
            httpResponse.status(204).json()
        }
        else
            httpResponse.status(404).json()
    }
    catch (error) 
    {
        httpResponse.status(400).json({ text: `Failed to update product! Error: ${error}` })
    }
})
.delete(async (httpRequest, httpResponse) => {
    try
    {
        if (httpRequest != undefined && httpRequest.product !== undefined)
        {
            await products.remove(httpRequest.product)
            
            httpResponse.status(204).json()
        }
        else
            httpResponse.status(404).json()
    }
    catch (error)
    {
        httpResponse.status(400).json({ text: `Failed to delete product! Error: ${error}` })
    }
})

module.exports = controller