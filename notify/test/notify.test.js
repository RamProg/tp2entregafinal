const { notifyFactory } = require('../../notify/factory/notifyFactory')
const { createMailer } = require('../../mailer/factory/mailerFactory')
const { createExchanger } = require('../../exchanger/factory/exchangerFactory')
const { createDaoSubscriptions } = require('../../dao/factory/daoSubscriptionsMongoFactory')
const { Subscription } = require('../../model/Subscription')

const test = async () => {

    // genero un mailer y un exchanger para pruebas con valores harcodeados
    mailer = createMailer
    exchanger = createExchanger

    // creo mis daos de subscriptores y symbols
    daoSubscriptions = createDaoSubscriptions()

    // creo mi instancia de notify
    const notify = notifyFactory.getNotify(mailer, exchanger)

    exchanger.setQuote('BTC', 0)
    exchanger.setQuote('ETH', 0)

    // hago una lista de suscriptores

    let subs = [
        {
            mail: 'un@mail.com',
            condition: 100,
            symbol: 'BTC'
        },
        {
            mail: 'otro@mail.com',
            condition: 200,
            symbol: 'BTC'
        },
        {
            mail: 'este@es.com',
            condition: 300,
            symbol: 'BTC'
        },
        {
            mail: 'un@mail.com',
            condition: 400,
            symbol: 'BTC'
        },
        {
            mail: 'otro@mas.com',
            condition: 500,
            symbol: 'BTC'
        },
        {
            mail: 'pepe@mas.com',
            condition: 300,
            symbol: 'ETH'
        },
        {
            mail: 'romo@mas.com',
            condition: 200,
            symbol: 'ETH'
        },
        {
            mail: 'lalo@mas.com',
            condition: 100,
            symbol: 'ETH'
        }
    ]
    // añado cada elemento de la lista
    subs.forEach(s => {
        subscription = new Subscription(s.mail, s.condition, s.symbol)
        daoSubscriptions.add(subscription)
    })

    // seteo un valor inicial de quote
    exchanger.setQuote('BTC', 100)

    // creo un intervalo para testear que finaliza el test tras 5 iteraciones
    console.log("Beginning test")
    await dots(15)

    await notify.aboveXNotify()

    console.log("Checking if emails sent is 0")
    if (mailer.sentEmails() === 0) console.log("%cPASS", "color: green;")
    else console.log("%cERROR", "color: red;")
    exchanger.setQuote('BTC', 200)
    await sleep(1000)
    await dots(15)  

    await notify.aboveXNotify()

    console.log("Checking if emails sent is 1")
    if (mailer.sentEmails() === 1) console.log("%cPASS", "color: green;")
    else console.log("%cERROR", "color: red;")
    exchanger.setQuote('BTC', 300)
    console.log(mailer.sentEmails())
    await sleep(1000)
    await dots(15)

    await notify.aboveXNotify()

    console.log("Checking if emails sent is 2")
    if (mailer.sentEmails() === 2) console.log("%cPASS", "color: green;")
    else console.log("%cERROR", "color: red;")
    exchanger.setQuote('BTC', 400)
    console.log(mailer.sentEmails())
    await sleep(1000)
    await dots(15)

    await notify.aboveXNotify()

    console.log("Checking if emails sent is 3")
    if (mailer.sentEmails() === 3) console.log("%cPASS", "color: green;")
    else console.log("%cERROR", "color: red;")
    exchanger.setQuote('BTC', 500)
    console.log(mailer.sentEmails())
    await sleep(1000)
    await dots(15)

    await notify.aboveXNotify()

    console.log("Checking if emails sent is 4")
    if (mailer.sentEmails() === 4) console.log("%cPASS", "color: green;")
    else console.log("%cERROR", "color: red;")
    exchanger.setQuote('BTC', 600)
    console.log(mailer.sentEmails())
    await sleep(1000)
    await dots(15)

    await notify.aboveXNotify()

    console.log("Checking if emails sent is 5")
    if (mailer.sentEmails() === 5) console.log("%cPASS", "color: green;")
    else console.log("%cERROR", "color: red;")
    exchanger.setQuote('BTC', 700)
    console.log(mailer.sentEmails())
    await sleep(1000)
    await dots(15)

    // console.log("Checking if emails sent is 2")
    // if (mailer.sentEmails() === 1) console.log("%cPASS", "color: green;")
    // else console.log("%cERROR", "color: red;")
    // exchanger.setQuote('BTC', 300)
    // await sleep(1000)
    // await dots(15)

    // console.log("Checking if emails sent is 3")
    // if (mailer.sentEmails() === 1) console.log("%cPASS", "color: green;")
    // else console.log("%cERROR", "color: red;")
    // exchanger.setQuote('BTC', 300)
    // await sleep(1000)
    // await dots(15)

    // console.log("Checking if emails sent is 4")
    // if (mailer.sentEmails() === 1) console.log("%cPASS", "color: green;")
    // else console.log("%cERROR", "color: red;")
    // exchanger.setQuote('BTC', 300)
    // await sleep(1000)
    // await dots(15)

    // console.log("Checking if emails sent is 5")
    // if (mailer.sentEmails() === 1) console.log("%cPASS", "color: green;")
    // else console.log("%cERROR", "color: red;")
    // exchanger.setQuote('BTC', 300)
    // await sleep(1000)
    // await dots(15)


    console.log("Finishing test")

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



