const { subscribe } = require('../subscribe/api/subscriberApi')
const { unsubscribe } = require('../unsubscribe/api/unsubscriberApi')

const express = require('express')

const port = 3000
const app = express()
app.use(express.json())

app.use(errorHandler)

// VERSION CON METODO POST

app.post('/api/subscription/', async (req, res) => {
    const { mail, condition, symbol } = req.body
    try {
        await subscribe(mail, condition, symbol)
        res.status(200).json({ message: "suscripcion exitosa de " + mail })
    } catch (e) {
        errorHandler(e, req, res)
    }
})

app.delete('/api/subscription/', async (req, res) => {
    console.log('llego request a delete')
    const { id } = req.body
    try {
        await unsubscribe(id)
        res.status(200).json({ message: "desuscripcion exitosa" })
    } catch (e) {
        errorHandler(e, req, res)
    }
})

function errorHandler(error, req, res, next) {
    if (error.type === 'INVALID_ARGS') {
        res.status(400)
    } else if (error.type === 'NOT_FOUND') {
        res.status(404)
    } else if (error.type === 'INTERNAL_ERROR') {
        res.status(500)
    } else {
        res.status(520)
    }
    res.json({ message: error.message })
}


app.listen(port, () => {
    console.log('server iniciado en puerto ' + port)

})
