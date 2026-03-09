class CustomApiError extends Error {

    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }

}

class OrderNotFoundError extends CustomApiError {

    constructor(orderId){
        super(`Order with ID '${orderId}' was not found.`, 404)
    }

}

class OrderAlreadyExistsError extends CustomApiError {

    constructor(orderId){
        super(`Order with the ID '${orderId}' already exists.`, 400)
    }

}

class InvalidOrderValueError extends CustomApiError {

    constructor(expectedValue, currentValue){
        super(`The order 'valorTotal' is '${expectedValue}', but the items value sum to '${currentValue}'.`, 400)
    }

}

class ItemNotFoundError extends CustomApiError{

    constructor(itemId){
        super(`The item with the ID '${itemId}' does not exists.`, 404)
    }

}

class InvalidIdTypeError extends CustomApiError{

    constructor(id){
        super(`The ID type must be a string. You gave '${id}'.`, 400)
    }

}

class DatabaseOperationError extends CustomApiError{

    constructor(error){
        super(`A database operation has failed. Check the following error: ${error}`, 500)
    }

}

module.exports = {
    OrderNotFoundError, 
    OrderAlreadyExistsError,
    InvalidOrderValueError,
    ItemNotFoundError,
    InvalidIdTypeError,
    DatabaseOperationError
}
