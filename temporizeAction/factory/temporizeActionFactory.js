const { createTemporizedAction } = require('../temporizeAction')
const { temporizerFactory } = require('../../temporizer/factory/temporizerFactory')

const temporizeActionFactory = {

    getTemporizedAction: (action, delay) => {
        const temporizer = temporizerFactory.getTemporizer(action, delay)
        const temporizedAction = createTemporizedAction(temporizer)
        return temporizedAction
    }
}
module.exports = { temporizeActionFactory }