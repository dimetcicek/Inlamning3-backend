const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: mongoose.Schema.Types.String, required: true},
    category: {type: mongoose.Schema.Types.String, required: true},
    price: {type: mongoose.Schema.Types.Number, required: true},
    rating: {type: mongoose.Schema.Types.Number, required: true},
    img: {type: mongoose.Schema.Types.String, required: true},
    title: {type: mongoose.Schema.Types.String, required: true}
})

module.exports = mongoose.model("products", productSchema)