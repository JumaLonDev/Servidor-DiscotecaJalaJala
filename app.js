import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'

import { createProductRouter } from './routes/product.js'
import { createCategoryRouter } from './routes/category.js'

export const createApp = ({ productModel, categoryModel }) => {
  const app = express()

  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/products', createProductRouter({ productModel }))
  app.use('/categories', createCategoryRouter({ categoryModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
