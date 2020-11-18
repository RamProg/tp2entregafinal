// la factory de subscriber no debería recibir los daos y el mailer como parametro
// pero lo puse así para poder testearlo, cuando haga persistencia hay que cambiarlo
const { createUnsubscriber } = require('../unsubscriber')
const { createMailer } = require('../../mailer/factory/mailerFactory')
const { createDaoSubscriptions } = require('../../dao/factory/daoSubscriptionsMongoFactory')
const { createDaoSymbols } = require('../../dao/factory/daoSymbolsMongoFactory')

const daoSubscriptions = createDaoSubscriptions()
const daoSymbols = createDaoSymbols()
const mailer = createMailer

const unsubscriberFactory = {
    getUnsubscriber: () => {
        return createUnsubscriber(mailer, daoSubscriptions, daoSymbols)
    }
}
module.exports = { unsubscriberFactory }