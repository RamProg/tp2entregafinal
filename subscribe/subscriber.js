// const { createDaoSubscriptions } = require('../dao/factory/daoSubscriptionsMongoFactory')
// const { createDaoSymbols } = require('../dao/factory/daoSymbolsMongoFactory')

const { Subscription } = require("../model/subscription")

// const daoSubscriptions = createDaoSubscriptions()
// const daoSymbols = createDaoSymbols()

const createSubscriber = (mailer, daoSubscriptions, daoSymbols) => {

    return {
        subscribe: async (mail, condition, symbol) => {

            const subscription = new Subscription(mail, condition, symbol)

            daoSubscriptions.add(subscription)
            daoSymbols.addUnique(subscription.symbol)

            //notifico la suscripción exitosa por mail
            const receiver = [subscription.mail]
            const subject = 'You have a new subscription'
            const text = 'You are now suscribed to ' + subscription.symbol
            await mailer.send({ receiver, subject, text })
            return subscription.id
        }
    }
}

module.exports = { createSubscriber }