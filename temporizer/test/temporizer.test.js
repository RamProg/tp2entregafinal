const { createTemporizer } = require('../temporizer')

async function test() {
    const temporizer = createTemporizer(testTemporizer, 1000)
    temporizer.startTemporizer()
    await sleep(4000)
    temporizer.cancelTemporizer()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const testTemporizer = () => {
    console.log('tengo que aparecer tres veces')
}

test()