
const prepareResponseData = (order, items) => {
    return {
        orderId: order.orderId,
        value: order.value,
        creationDate: order.creationDate,
        items: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    }
}

module.exports = { prepareResponseData }