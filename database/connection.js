const { MongoClient } = require('mongodb')
require('dotenv').config();

const uri = process.env.DB_STRING

async function createDbClient() {
    return await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = {
    createDbClient
}