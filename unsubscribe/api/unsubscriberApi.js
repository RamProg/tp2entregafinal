const { unsubscriberFactory } = require('../factory/unsubscriberFactory')
// esto no va a funcionar porque tengo el factory modificado para poder testearlo
// entonces tiene parámetros // lo agregué como parámetro para probar

// const { createMailer } = require('../../mailer/factory/mailerFactory')

// const mailer = createMailer

const unsubscriber = unsubscriberFactory.getUnsubscriber()

function unsubscribe(mail, condition, symbol) {
    return unsubscriber.unsubscribe(mail, condition, symbol)
}

module.exports = {
    unsubscribe
}