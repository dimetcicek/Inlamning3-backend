const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const mongodb = async () => {
    const connection = await  mongoose.connect(process.env.MONGODB_URI)

    console.log(`MongoDB is running at ${connection.connection.host}`)
}

module.exports = mongodb