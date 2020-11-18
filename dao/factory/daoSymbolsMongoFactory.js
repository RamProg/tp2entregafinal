const { createDbClient } = require('../../database/connection')
const { v4: uuidv4 } = require('uuid');

function generateId(array) {

    const v4options = {
        array,
    };
    return uuidv4(v4options)
}

function createDaoSymbols() {
    return {
        async addUnique(symbol) {
            const client = await createDbClient()
            try {
                await client.connect()
                const db = client.db("cryptonaitdb")
                if (!await this.exists(symbol)) {
                    await db.collection("cryptos").insertOne({
                        _id: generateId([symbol]),
                        name: symbol,
                        symbol,
                        // acá usaría el exchanger o recibiría el parámetro
                        quote: 0
                    })
                }
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
            }
        },
        async removeUnique(symbol) {
            const client = await createDbClient()
            try {
                await client.connect()
                const db = client.db("cryptonaitdb")

                let flag = await db.collection("subscriptions").findOne({ symbol })
                if (!flag) await db.collection("cryptos").deleteOne({ symbol })
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
            }
        },
        async getAll() {
            const client = await createDbClient()
            let all = []
            try {
                await client.connect()
                const db = await client.db("cryptonaitdb")

                all = await db.collection("cryptos").find().toArray()
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
                console.log(all)
            }
        },
        async getAll() {
            const client = await createDbClient()
            let all = []
            try {
                await client.connect()
                const db = await client.db("cryptonaitdb")

                all = await db.collection("cryptos").find().toArray()
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
                return all
            }
        },
        async exists(symbol) {
            const client = await createDbClient()
            let all = []
            try {
                await client.connect()
                const db = await client.db("cryptonaitdb")
                all = await db.collection("cryptos").find({ symbol }).toArray()
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
                return all.length
            }
        },

        async setValue(symbolP, value) {
            const client = await createDbClient()
            try {
                await client.connect()
                const db = await client.db("cryptonaitdb")
                let cr = await db.collection("cryptos").findOne({ symbol: symbolP })
                if (cr) await db.collection("cryptos").updateOne({ symbol: symbolP }, { $set: { quote: value } })
                else await this.addUnique(symbolP)
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
            }
        },
        async getValue(symbol) {
            let crypto = null
            const client = await createDbClient()
            try {
                await client.connect()
                const db = await client.db("cryptonaitdb")
                crypto = await db.collection("cryptos").find({ symbol })
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
                return c.quote
            }
        },
        async length() {
            const client = await createDbClient()
            let value = 0
            try {
                await client.connect()
                const db = client.db("cryptonaitdb")

                value = await db.collection("cryptos").countDocuments()
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
                return value
            }
        },
    }
}

module.exports = { createDaoSymbols }
