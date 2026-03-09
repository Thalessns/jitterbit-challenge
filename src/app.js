const express = require('express')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const app = express()
const port = 3000

const swaggerDoc = YAML.load('./swagger.yaml')

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

const { orderRouter } = require('./routes/order-routes')
const { authMiddleware } = require('./middleware/auth')

app.use('/order', authMiddleware, orderRouter)

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
    console.log(`Docs available in /api-docs`)
})
