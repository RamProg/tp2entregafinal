createTemporizer = (method, delay) => {


    const startTemporizer = () => {
        temporizer = setInterval(method, delay)
    }

    const cancelTemporizer = () => {
        clearInterval(temporizer)
    }

    return {
        startTemporizer,
        cancelTemporizer,
    }
}

module.exports = { createTemporizer }