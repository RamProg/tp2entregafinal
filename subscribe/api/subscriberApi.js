const { subscriberFactory } = require('../factory/subscriberFactory')
// esto no va a funcionar porque tengo el factory modificado para poder testearlo
// entonces tiene parámetros // lo agregué como parámetro para probar
// const { createMailer } = require('../../mailer/factory/mailerFactory')

// const daoSubscriptions = createDaoSubscriptions()
// const daoSymbols = createDaoSymbols()
// const mailer = createMailer

function subscribe(mail, condition, symbol) {
    const subscriber = subscriberFactory.getSubscriber()
    return subscriber.subscribe(mail, condition, symbol)
}

module.exports = {
    subscribe
}