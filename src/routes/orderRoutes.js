const express = require('express')
const orderRouter = express.Router()
const validate = require('../middleware/validator')
const { orderRequest, orderUpdate } = require('../schemas/order')

const { createOrder, listAllOrders, getOrder, updateOrder, deleteOrder, } = require('../service/order-service')

orderRouter.post("/", validate({ body: orderRequest }), async (req, res) => {
    const result = await createOrder(req.body)
    res.status(201).json(result)
})

orderRouter.get("/list", async (req, res) => {
    const result = await listAllOrders()
    res.status(200).json(result)
})

orderRouter.get("/:id", async (req, res) => {
    const result = await getOrder(req.params.id)
    res.status(200).json(result)
})

orderRouter.patch("/:id", validate({ body: orderUpdate }), async (req, res) => {
    const result = await updateOrder(req.params.id, req.body)
    res.status(200).json(result)
})

orderRouter.delete("/:id", async (req, res) => {
    const result = await deleteOrder(req.params.id)
    res.status(204).json(result)
})

module.exports = { orderRouter }
