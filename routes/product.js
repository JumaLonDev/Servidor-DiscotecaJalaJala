import { Router } from 'express'
import { ProductController } from '../controllers/product.js'

export const createProductRouter = ({ productModel }) => {
  const productRouter = Router()

  const productController = new ProductController({ productModel })

  productRouter.get('/', productController.getAll)
  productRouter.post('/', productController.create)

  productRouter.get('/:id', productController.getById)
  productRouter.delete('/:id', productController.delete)
  productRouter.patch('/:id', productController.update)

  return productRouter
}
