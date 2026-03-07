
const orderItem = {
    type: 'object',
    properties: {
        idItem: { type: 'string' , minLength: 1 },
        quantidadeItem: { type: 'integer', minimum: 1 },
        valorItem: { type: 'number', minimum: 0.01 },
    },
    additionalProperties: false,
    required: ['idItem', 'quantidadeItem', 'valorItem']
}

const orderRequest = {
    type: 'object',
    properties: {
        numeroPedido: { type: 'string', minLength: 3 },
        valorTotal: { type: 'number', minimum: 0.01 },
        dataCriacao: { type: 'string', minLength: 1 },
        items: {
            type: 'array',
            items: orderItem,
            minItems: 1
        }
    },
    additionalProperties: false,
    required: ['numeroPedido', 'valorTotal', 'dataCriacao', 'items']
}

module.exports = { orderRequest }