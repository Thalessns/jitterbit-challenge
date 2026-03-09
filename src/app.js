const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const { orderRouter } = require('./routes/order-routes')
app.use('/order', orderRouter)

app.get('/', (req, res) => {
  res.send('App is alive and running!')
})

app.use((error, req, res, next) => {
  if (error.name === "JsonSchemaValidationError"){
    return res.status(400).json({
      status: "error",
      message: `Your request body is not valid according to the schema. Check the API Swagger for more details. ${error}`,
    })
  }
  if (error.statusCode === undefined) error.statusCode = 500
  return res.status(error.statusCode).json({status: "error", message: error.message})
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
