
const { item } = require('./item')

const orderRequest = {
    type: 'object',
    properties: {
        numeroPedido: { type: 'string', minLength: 3 },
        valorTotal: { type: 'number', minimum: 0.01 },
        dataCriacao: { type: 'string', minLength: 1 },
        items: {
            type: 'array',
            items: item,
            minItems: 1
        }
    },
    additionalProperties: false,
    required: ['numeroPedido', 'valorTotal', 'dataCriacao', 'items']
}

module.exports = { orderRequest }