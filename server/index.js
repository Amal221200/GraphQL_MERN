require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const colors = require('colors');
const cors = require('cors');

const connnectDB = require('./config/db')
const schema = require('./schema/schema')

const app = express()

connnectDB();

app.use(cors());

const port = process.env.PORT || 8000

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})