// está mal que el dao reciba otro dao, pero es la manera que tengo de que el daoSymbols sepa su hay alguien suscripto a un symbol
const { isSubscribed } = require('./daoSubscriptionsFactory.js')

function createDaoSymbols() {
    let symbols = new Map()
    return {
        addUnique: (symbol) => {
            if (!symbols.get(symbol)) {
                symbols.set(symbol, null)
            }
        },
        removeUnique: (symbol) => {
            if (!isSubscribed(symbol)) {
                symbols.delete(symbol)
            }
        },
        showAll: () => {
            console.log(symbols)
        },
        getAll: () => {
            return symbols
        },
        setValue: (id, value) => {
            symbols.set(id, value)
        },
        getValue: (id) => {
            return symbols.get(id)
        },
        length: () => {
            symbols.size
        }
    }
}

module.exports = { createDaoSymbols }
