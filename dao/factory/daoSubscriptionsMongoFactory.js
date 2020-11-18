const { createDbClient } = require('../../database/connection')


function isSubscribed(symbol) {
    return (mem.find(el => el.symbol === symbol))
}

function createDaoSubscriptions() {
    return {
        async add(subscription) {
            const client = await createDbClient()
            try {
                await client.connect()
                const db = client.db("cryptonaitdb")

                await db.collection("subscriptions").insertOne(subscription)
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
            }
        },
        async remove(id) {
            const client = await createDbClient()
            let element = 0
            try {
                await client.connect()
                const db = await client.db("cryptonaitdb")
                element = await (await db.collection("subscriptions").deleteOne({ _id: id })).deletedCount
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
                return element
            }
        }
        ,
        async length() {
            const client = await createDbClient()
            let value = 0
            try {
                await client.connect()
                const db = client.db("cryptonaitdb")

                value = await db.collection("subscriptions").countDocuments()
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
                return value
            }
        },

        async getAll() {
            const client = await createDbClient()
            let all = []
            try {
                await client.connect()
                const db = await client.db("cryptonaitdb")
                all = await db.collection("subscriptions").find({}).toArray()
                console.log('.')
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
                return all
            }
        },
        async getByMail(mail) {
            const client = await createDbClient()
            let all = []
            try {
                await client.connect()
                const db = await client.db("cryptonaitdb")
                let array = await db.collection("subscriptions").find().toArray()
                all = array.filter(s => s.mail === mail)
            } catch (e) {
                console.log(e.message)
            } finally {
                await client.close()
                return all
            }
        }

    }
}
module.exports = { createDaoSubscriptions, isSubscribed }
