const { temporizeActionFactory } = require('../factory/temporizeActionFactory')

async function test() {
    const temporizedAction = temporizeActionFactory.getTemporizedAction(testTemporizer, 500)

}

const testTemporizer = () => {
    console.log('tengo que aparecer sin parar cada medio segundo')
}

test()