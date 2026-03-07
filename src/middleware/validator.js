const { Validator } = require('express-json-validator-middleware')

const validator = new Validator({
    coerceTypes: true
})

module.exports = validator.validate
