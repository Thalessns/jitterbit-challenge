const express = require('express')
const orderRouter = express.Router()
const validate = require('../middleware/validator')
const { orderRequest } = require('../schemas/order')

orderRouter.post(
    "/", 
    validate({ body: orderRequest }),
    (req, res) => {
    res.status(201).send('Order created successfully!')
})

orderRouter.get(
    "/", 
    (req, res) => {
    res.status(200).send('List of orders')
})

module.exports = { orderRouter }
