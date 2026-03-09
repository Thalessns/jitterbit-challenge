const { prisma } = require("../database/prisma")
const { prepareResponseData } = require("../utils/data-operations")
const {
    OrderNotFoundError,
    OrderAlreadyExistsError,
    ItemNotFoundError,
    InvalidIdTypeError,
    DatabaseOperationError 
} = require("../error/custom-errors")

const createOrder = async (orderData) => {
    const result = await prisma.$transaction(async (tx) => {
        try{
            const newOrder = await tx.order.create({
            data: {
                orderId: orderData.numeroPedido,
                value: orderData.valorTotal,
                creationDate: new Date(orderData.dataCriacao)
            }
            })
            const createdItems = []
            for (const item of orderData.items) {
                const newItem = await tx.items.create({
                    data: {
                        orderId: orderData.numeroPedido,
                        productId: item.idItem,
                        quantity: item.quantidadeItem,
                        price: item.valorItem
                    }
                })
                createdItems.push(newItem)
            }
        }
        catch(error){
            if (error.code === "P2002") throw new OrderAlreadyExistsError(orderData.numeroPedido)
            throw new DatabaseOperationError(error)
        }
        return prepareResponseData(newOrder, createdItems)
    })
    return result
}

const listAllOrders = async () => {
    let orders = []
    const orderRows = await prisma.order.findMany()
    for (const order of orderRows){
        const itemRows = await prisma.items.findMany(
            { where: { orderId: order.orderId } }
        )
        orders.push(prepareResponseData(order, itemRows))
    }
    return orders
}

const getOrder = async (id) => {
    if (typeof id != 'string'){
        throw new InvalidIdTypeError(id)
    }
    const order = await prisma.order.findFirst(
        { where: {orderId: id} }
    )
    if (order === null){
        throw new OrderNotFoundError(id)
    }
    const items = await prisma.items.findMany(
        { where: {orderId: id}, distinct: ["productId"] }
    )
    return prepareResponseData(order, items)
}

const updateFullOrder = async (id, orderUpdate) => {
    const order = await getOrder(id)
    let orderData = prepareUpdateOrderData(orderUpdate)
    let itemsData = prepareUpdateItemsData(orderUpdate.items)
    const result = await prisma.$transaction(async (tx) => {
        let updatedOrder = order
        let updatedItems = orderUpdate.items
        if (Object.keys(orderData).length > 0){
            updatedOrder = await updateOrder(id, orderData, tx)
        }
        if (itemsData.length > 0){
            updatedItems = []
            for (const item of itemsData){
                const itemId = item.productId
                delete item.productId
                const updatedItem = await updateItem(id, itemId, item, tx) 
                updatedItems.push(updatedItem)
            }
        }
        return prepareResponseData(updatedOrder, updatedItems)
    })
    return result
}

const prepareUpdateOrderData = (orderUpdate) => {
    let orderData = {}
    if (orderUpdate.valorTotal != null){
        orderData.value = orderUpdate.valorTotal
    }
    if (orderUpdate.dataCriacao != null){
        orderData.creationDate = orderUpdate.dataCriacao
    }
    return orderData
}

const updateOrder = async (orderId, orderData, tx) => {
    return await tx.order.update({
        where: { orderId: orderId },
        data: orderData
    })
}

const prepareUpdateItemsData = (itemsUpdate) => {
    let itemsData = []
    if (itemsUpdate.length > 0){
        for (const item of itemsUpdate){
            let itemData = {}
            if (item.quantidadeItem != null){
                itemData.quantity = item.quantidadeItem
            }
            if (item.valorItem != null){
                itemData.price = item.valorItem
            }
            if (Object.keys(itemData).length > 0){
                itemData.productId = item.idItem
                itemsData.push(itemData)
            }
        }
    }
    return itemsData
}

const updateItem = async (orderId, itemId, item, tx) => {
    try{
        return await tx.items.update({
        data: item,
        where: {
            orderId_productId: { 
                orderId: orderId, productId: itemId 
            }
        }
        })
    }
    catch(error){
        if (error.code === "P2025") throw new ItemNotFoundError(itemId)
        throw new DatabaseOperationError(error)
    }
}

const deleteOrder = async (id) => {
    const order = await getOrder(id)
    const deletedOrder = await prisma.order.delete(
        { where: { orderId: id } }
    )
    return true
}

module.exports = { createOrder, listAllOrders, getOrder, updateFullOrder, deleteOrder }
