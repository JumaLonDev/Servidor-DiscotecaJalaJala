import { validateProduct, validatePartialProduct } from '../schemas/product.js'

export class ProductController {
  constructor ({ productModel }) {
    this.productModel = productModel
  }

  getAll = async (req, res) => {
    const products = await this.productModel.getAll()
    res.json(products)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const product = await this.productModel.getById({ id })
    if (product) return res.json(product)
    res.status(404).json({ message: 'Movie not found ' })
  }

  create = async (req, res) => {
    const result = validateProduct(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newProduct = await this.productModel.create({ input: result.data })

    res.status(201).json(newProduct)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.productModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Product not found ' })
    }

    return res.json({ message: 'Product Deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialProduct(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updateProduct = await this.productModel.update({ id, input: result.data })

    return res.json(updateProduct)
  }
}
