let api = new Map()

const createExchanger = {

    getQuote: symbol => {
        return api.get(symbol)
    },
    setQuote: (symbol, quote) => {
        api.set(symbol, quote)
    }
}

module.exports = { createExchanger }