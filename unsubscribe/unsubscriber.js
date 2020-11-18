
const createUnsubscriber = (mailer, daoSubscriptions, daoSymbols) => {

    return {
        unsubscribe: async (id) => {

            const unsubscription = await daoSubscriptions.remove(id)

            if (unsubscription) {
                daoSymbols.removeUnique(unsubscription.symbol)
                //notifico la desuscripción exitosa por mail
                const receiver = [unsubscription.mail]
                const subject = 'You have been unsubscribed'
                const text = 'You are no longer suscribed to ' + unsubscription.symbol
                await mailer.send({ receiver, subject, text })
            } else {
                throw new Error('The subscription does not exist');
            }
        }
    }
}

module.exports = { createUnsubscriber }