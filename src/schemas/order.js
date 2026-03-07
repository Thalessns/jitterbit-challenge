
const { itemRequest, itemUpdate } = require('./item')

const orderRequest = {
    type: 'object',
    properties: {
        numeroPedido: { type: 'string', minLength: 3 },
        valorTotal: { type: 'number', minimum: 0.01 },
        dataCriacao: { type: 'string', minLength: 1 },
        items: {
            type: 'array',
            items: itemRequest,
            minItems: 1
        }
    },
    additionalProperties: false,
    required: ['numeroPedido', 'valorTotal', 'dataCriacao', 'items']
}

const orderUpdate = {
    type: 'object',
    properties: {
        valorTotal: { type: ['number', 'null'], minimum: 0.01, default: null },
        dataCriacao: { type: ['string', 'null'], minLength: 1, default: null },
        items: {
            type: 'array',
            items: itemUpdate,
            minItems: 0
        }
    }
}

module.exports = { orderRequest, orderUpdate }