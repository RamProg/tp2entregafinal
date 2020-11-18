// crear apiCasoDeUso.js para cada casos de uso que se accedan desde un cliente


createNotify = (mailer, exchanger, daoSubscriptions) => {
    // TODO desharcodear y poner el DAO de suscripciones
    // recibir el DAO de suscripciones como parametro
    // y dao de symbols
    // let subscriptions = []

    // const symbols = new Map()

    // const suscribe = (subscription) => {
    //     subscriptions.push(subscription)
    //    
    // }

    // const unsuscribe = (subscription) => {
    //     subscriptions = subscriptions.filter(s =>
    //         s.mail !== subscription.mail || s.condition !== subscription.condition)
    //     let flag = false
    //     for (let s of subscriptions) if (subscription.symbol === s.symbol) {
    //         flag = true
    //         break
    //     }
    //     if (!flag) symbols.delete(subscription.symbol)
    // }

    let symbols = new Map()

    const aboveXNotify = async () => {

        updateQuotes()

        let lista = await daoSubscriptions.getAll()
        lista.forEach(async (s) => {

            let quote = symbols.get(s.symbol)

            if (!quote) {
                quote = await exchanger.getQuote(s.symbol)
                symbols.set(s.symbol, quote)
            }
            if (quote > s.condition) {

                let message = 'This is a notification to let you know that the current value of BTC is ' + quote
                let subject = 'Quote Notification'
                await mailer.send([s.mail], subject, message)

                // desuscribe
                // unsubscriber.unsuscribe(s.id)
                await daoSubscriptions.remove(s._id)
            }
        })
    }

    const updateQuotes = () => {

        Array.from(symbols.keys()).forEach(k => {
            symbols.set(k, exchanger.getQuote(k))
        })
    }

    return {
        aboveXNotify,
    }
}

module.exports = { createNotify }