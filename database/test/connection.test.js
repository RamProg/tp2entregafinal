const { createDbClient } = require('../connection')

const example = { _id: 1, mail: "un@mail.com", condition: 20000, symbol: "BTC" }

async function addSubscription(subscription) {
    const client = await createDbClient()
    try {
        await client.connect()
        const db = await client.db("cryptonaitdb")

        await db.collection("subscriptions").insertOne(subscription)
    } catch (e) {
        console.log(e.message)
    } finally {
        await client.close()
    }
}

async function showSubscription(id, expected) {
    const client = await createDbClient()
    try {
        await client.connect()
        const db = await client.db("cryptonaitdb")

        const found = await db.collection("subscriptions").findOne({ _id: id })
        console.log(found)
        if (found === expected) console.log('PASS')
        else console.log(found.mail === expected.mail ? 'PASS' : 'FAIL')
    } catch (e) {
        console.log(e.message)
    } finally {
        await client.close()
    }
}

async function deleteSubscription(id) {
    const client = await createDbClient()
    try {
        await client.connect()
        const db = await client.db("cryptonaitdb")

        await db.collection("subscriptions").deleteOne({ _id: id })
    } catch (e) {
        console.log(e.message)
    } finally {
        await client.close()
    }
}

async function test() {
    console.log("Starting test")
    await dots(15)
    console.log("Adding subscriptor")
    await dots(15)
    await addSubscription(example)
    console.log("Showing the added subscriptor")
    await dots(15)
    await showSubscription(1, example)
    await dots(15)
    console.log("Deleting the added subscriptor")
    await dots(15)
    await deleteSubscription(1)
    console.log("Showing the deleted subscriptor - Must be null")
    await dots(15)
    await showSubscription(1, null)
    await dots(15)
    console.log("Test finished")

}

async function dots(dots) {
    for (let i = 0; i < dots; i++) {
        process.stdout.write(".")
        await sleep(50)
    }
    console.log('')
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


test()

// async function main() {
//     const client = await createDbClient()
//     try {
//         await client.connect()
//         const db = await client.db("cryptonaitdb")

//         await db.collection("cryptos").insertOne(crypto)
//     } catch (e) {
//         console.log(e.message)
//     } finally {
//         await client.close()
//     }
// }
// main()