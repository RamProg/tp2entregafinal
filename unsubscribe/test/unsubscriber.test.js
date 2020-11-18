const { unsubscriberFactory } = require('../factory/unsubscriberFactory')
const { subscriberFactory } = require('../../subscribe/factory/subscriberFactory')
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
    const unsubscriber = unsubscriberFactory.getUnsubscriber(mailer, daoSymbols)

    // let subscriptions = []
    // let symbols = new Map()

    console.log("Starting Test...")
    await sleep(1000)
    await dots(15)

    console.log('Creating harcoded data for this test...')
    daoSymbols.setValue('BTC', 14000)
    daoSymbols.setValue('ETH', 500)
    daoSymbols.setValue('XMR', 240)

    const symbolsTest = new Map()
    symbolsTest.set('BTC', 14000)
    symbolsTest.set('ETH', 500)
    symbolsTest.set('XMR', 240)

    await sleep(1000)
    await dots(15)

    console.log('Subscribing new subscribers')

    await subscriber.subscribe('un@correo.com', 14000, 'BTC')
    await subscriber.subscribe('otro@correo.com', 500, 'ETH')
    await subscriber.subscribe('another@correo.com', 240, 'XMR')

    await sleep(1000)
    await dots(15)

    console.log('Unsubscribing a subscriber')

    let oldSubscriptionsCount = await daoSubscriptions.length()
    console.log(oldSubscriptionsCount)
    await sleep(1000)
    await dots(15)

    //
    //ingresar el ID a testear ACA
    //

    const array = await daoSubscriptions.getByMail('un@correo.com')
    const id = array[0]._id

    await unsubscriber.unsubscribe(id)

    console.log('Checking if the number of notifications is correct')

    await sleep(1000)


    console.log(mailer.sentEmails() === 4 ? 'PASS' : 'ERROR')
    await dots(15)

    console.log('Checking if the new number of subscriptions is correct')
    await sleep(1000)
    console.log(await daoSubscriptions.length())
    console.log(await daoSubscriptions.length() === oldSubscriptionsCount - 1 ? 'PASS' : 'ERROR')
    await dots(15)

    // console.log('Checking if the number of symbols is correct')
    // await sleep(1000)
    // console.log(daoSymbols.length() === symbolsTest.size ? 'PASS' : 'ERROR')
    // console.log(daoSymbols)
    // console.log(daoSymbols.length())
    // console.log(symbolsTest.size)
    // await dots(15)

    // console.log('Unsuscribing a subscriber')
    // await sleep(1000)
    // await dots(15)
    // _unsuscriber.unsuscribe(s1)

    // console.log('Checking if the new number of subscriptions is correct')
    // await sleep(1000)
    // console.log(subscriptions.length === subscriptionsTest.length - 1 ? 'PASS' : 'ERROR')
    // await dots(15)

    // console.log('Checking if the new number of symbols is correct')
    // await sleep(1000)
    // console.log(symbols.size === symbolsTest.size - 1 ? 'PASS' : 'ERROR')
    // await dots(15)

    // console.log('Checking if the new number of notifications is correct')
    // await sleep(1000)
    // console.log(sentNotifications === 4 ? 'PASS' : 'ERROR')
    // await dots(15)

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