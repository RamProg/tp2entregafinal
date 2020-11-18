const { createDaoSubscriptions } = require('../../dao/factory/daoSubscriptionsMongoFactory')
const { createNotify } = require('../notify')

const daoSubscriptions = createDaoSubscriptions()

const notifyFactory = {
    getNotify: (mailer, exchanger, ) => {
        return createNotify(mailer, exchanger, daoSubscriptions)
    }
}
module.exports = { notifyFactory }