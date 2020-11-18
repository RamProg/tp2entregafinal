
let mem = []

function isSubscribed(symbol) {
    return (mem.find(el => el.symbol === symbol))
}

function createDaoSubscriptions() {
    return {
        add: (subscription) => {
            mem.push(subscription)
        },
        remove: (id) => {
            let flag = mem.find(el => el.id === id)
            if (flag) mem = mem.filter(el => el.id !== id)
            return flag
        },
        length: () => {
            return mem.length
        },

        getAll: () => {
            return mem
        }

    }
}
module.exports = { createDaoSubscriptions, isSubscribed }
