const { createTemporizer } = require('../temporizer')

const temporizerFactory = {
    getTemporizer: (method, delay) => {
        return createTemporizer(method, delay)
    }
}
module.exports = { temporizerFactory }