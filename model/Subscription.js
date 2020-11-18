const { ValidationError } = require('../errors/ValidationError')
const { v4: uuidv4 } = require('uuid');

function generateId(array) {

    const v4options = {
        array,
    };
    return uuidv4(v4options)
}

function validateMail(mail) {
    if (typeof mail !== 'string' || !mail.includes('@')) throw new ValidationError('The mail must contain an @')
}

function validateCondition(condition) {
    if (isNaN(condition) || condition <= 0) throw new ValidationError('The condition must be a number above 0')
}

function validateSymbol(symbol) {
    if (typeof symbol !== 'string' || symbol.length !== 3) throw new ValidationError('The symbol must be a string of 3 characters')
}


class Subscription {
    constructor(mail, condition, symbol) {

        validateMail(mail)
        validateCondition(condition)
        validateSymbol(symbol)

        this._id = generateId([mail, condition, symbol])
        this.mail = mail
        this.condition = condition
        this.symbol = symbol.toUpperCase()
    }
}

module.exports = { Subscription }