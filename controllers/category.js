import { validateCategory, validatePartialCategory } from '../schemas/category.js'

export class CategoryController {
  constructor ({ categoryModel }) {
    this.categoryModel = categoryModel
  }

  getAll = async (req, res) => {
    const categories = await this.categoryModel.getAll()
    res.json(categories)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const category = await this.categoryModel.getById({ id })
    if (category) return res.json(category)
    res.status(404).json({ message: 'Category not found ' })
  }

  create = async (req, res) => {
    const result = validateCategory(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newCategory = await this.categoryModel.create({ input: result.data })

    res.status(201).json(newCategory)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.categoryModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Category not found ' })
    }

    return res.json({ message: 'Category Deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialCategory(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updateCategory = await this.categoryModel.update({ id, input: result.data })

    return res.json(updateCategory)
  }
}
