import express, { json } from 'express'
import { createProductRouter } from './routes/product.js'

export const createApp = ({ productModel }) => {
  const app = express()

  app.use(json())
  app.disable('x-powered-by')

  app.use('/products', createProductRouter({ productModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
