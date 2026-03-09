
const { itemRequest, itemUpdate } = require('./item')

const dateRegex = '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?([+-]\\d{2}:\\d{2}|Z)$'

const orderRequest = {
    type: 'object',
    properties: {
        numeroPedido: { type: 'string', minLength: 3, maxLength: 50 },
        valorTotal: { type: 'number', minimum: 0.01 },
        dataCriacao: { type: 'string', pattern: dateRegex },
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
        dataCriacao: { type: ['string', 'null'], pattern: dateRegex, default: null },
        items: {
            type: 'array',
            items: itemUpdate,
            minItems: 0
        }
    }
}

module.exports = { orderRequest, orderUpdate }