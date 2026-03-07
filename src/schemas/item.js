
const item = {
    type: 'object',
    properties: {
        idItem: { type: 'string' , minLength: 1 },
        quantidadeItem: { type: 'integer', minimum: 1 },
        valorItem: { type: 'number', minimum: 0.01 },
    },
    additionalProperties: false,
    required: ['idItem', 'quantidadeItem', 'valorItem']
}

module.exports = { item }
