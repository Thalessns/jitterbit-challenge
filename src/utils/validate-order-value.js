
const { InvalidOrderValueError } = require('../error/custom-errors')

const validateOrderValue = (orderValue, items) => {
    let sum = 0
    for (item of items) sum += item.valorItem * item.quantidadeItem
    if (orderValue != sum) throw new InvalidOrderValueError(orderValue, sum)
}

module.exports = { validateOrderValue }
