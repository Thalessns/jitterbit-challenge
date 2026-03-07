
const itemRequest = {
    type: 'object',
    properties: {
        idItem: { type: 'string' , minLength: 1 },
        quantidadeItem: { type: 'integer', minimum: 1 },
        valorItem: { type: 'number', minimum: 0.01 },
    },
    additionalProperties: false,
    required: ['idItem', 'quantidadeItem', 'valorItem']
}

const itemUpdate = {
    type: 'object',
    properties: {
        idItem: { type: 'string' , minLength: 1 },
        quantidadeItem: { type: ['integer', 'null'], minimum: 1, default: null },
        valorItem: { type: ['number', 'null'], minimum: 0.01, default: null }
    },
    additionalProperties: false,
    required: ["idItem"]
}

module.exports = { itemRequest, itemUpdate }
