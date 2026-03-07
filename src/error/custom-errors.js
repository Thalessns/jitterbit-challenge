class CustomApiError extends Error {

    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }

}

class OrderNotFoundError extends CustomApiError {

    constructor(){
        super("Order with the given ID was not found.", 404)
    }

}

class OrderAlreadyExistsError extends CustomApiError {

    constructor(){
        super("Order with the given ID already exists.", 400)
    }

}

module.exports = { OrderNotFoundError, OrderAlreadyExistsError }