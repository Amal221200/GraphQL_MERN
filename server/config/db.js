const mongoose = require('mongoose');

const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/MERN_GraphQL'

const connectDB = async ()=> {
    const conn = await mongoose.connect(mongo_uri)
    console.log(`MongoDB connected at ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB