const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const { orderRouter } = require('./routes/orderRoutes')
app.use('/orders', orderRouter)

app.get('/', (req, res) => {
  res.send('App is alive and running!')
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})

app.use((error, req, res, next) => {
  if (error.name === "JsonSchemaValidationError"){
    console.log("Body: ", req.body)
    console.log("Validation errors: ", JSON.stringify(error.validationErrors, null, 2))
    return res.status(400).json({
      status: "error",
      message: "Your request body is not valid according to the schema. Check the API Swagger for more details.",
    })
  }
})
