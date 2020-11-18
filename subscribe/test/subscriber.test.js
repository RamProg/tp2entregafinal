const { subscriberFactory } = require('../factory/subscriberFactory')
const { createDaoSubscriptions } = require('../../dao/factory/daoSubscriptionsMongoFactory')
const { createDaoSymbols } = require('../../dao/factory/daoSymbolsMongoFactory')
const { createMailer } = require('../../mailer/factory/mailerFactory')

async function main() {

    // const mailer = {
    //     send: ({ mail, subject, message }) => {
    //         sentNotifications++
    //     }
    // }

    // const daoSubscriptions = {
    //     add: (subscription) => {
    //         subscriptions.push(subscription)
    //     },
    //     remove: (subscription) => {
    //         subscriptions = subscriptions.filter(s => s.mail !== subscription.mail &&
    //             s.symbol !== subscription.symbol && s.condition !== subscription.symbol)
    //     }
    // }

    // const daoSymbols = {
    //     addUnique: (symbol) => {
    //         symbols.set(symbol, symbols.get(symbol))
    //     },
    //     removeUnique: (symbol) => {
    //         let flag = false
    //         for (let s of subscriptions) if (s.symbol === symbol) {
    //             flag = true
    //             break
    //         }
    //         if (!flag) symbols.delete(symbol)
    //     }
    // }

    const daoSubscriptions = createDaoSubscriptions()
    const daoSymbols = createDaoSymbols()
    const mailer = createMailer

    const subscriber = subscriberFactory.getSubscriber(mailer, daoSymbols)

    console.log("Starting Test...")
    await sleep(1000)
    await dots(15)

    console.log('Creating harcoded data for this test...')
    await daoSymbols.setValue('BTC', 14000)
    await daoSymbols.setValue('ETH', 500)
    await daoSymbols.setValue('XMR', 240)

    const subscriptionsTest = [
        { mail: 'un@correo.com', symbol: 'BTC', condition: 14000 },
        { mail: 'otro@correo.com', symbol: 'ETH', condition: 500 },
        { mail: 'another@correo.com', symbol: 'XMR', condition: 240 }
    ]

    const symbolsTest = new Map()
    symbolsTest.set('BTC', 14000)
    symbolsTest.set('ETH', 500)
    symbolsTest.set('XMR', 240)

    await sleep(1000)
    await dots(15)

    console.log('Subscribing new suscribers')

    let oldSubscriptionsCount = await daoSubscriptions.length()
    await subscriber.subscribe('un@correo.com', 14000, 'BTC')
    await subscriber.subscribe('otro@correo.com', 500, 'ETH')
    await subscriber.subscribe('another@correo.com', 240, 'XMR')

    await sleep(1000)
    await dots(15)

    console.log('Checking if the number of notifications is correct')
    await sleep(1000)
    console.log(mailer.sentEmails() === 3 ? 'PASS' : 'ERROR')
    await dots(15)

    console.log('Checking if the number of subscriptions is correct')
    await sleep(1000)
    let newSubscriptionsCount = await daoSubscriptions.length() - oldSubscriptionsCount
    console.log(newSubscriptionsCount === subscriptionsTest.length ? 'PASS' : 'ERROR')
    await dots(15)

    console.log("Test Finished")
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

main()