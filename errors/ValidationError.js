class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        this.type = 'INVALID_ARGS'
    }
}

module.exports = { ValidationError }