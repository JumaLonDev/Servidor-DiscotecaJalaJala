import mysql from 'mysql2/promise'
import { DEFAULT_CONFIG } from '../../config.js'

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connnection = await mysql.createConnection(connectionString)

export class CategoryModel {
  static async getAll () {
    const [categories] = await connnection.query('SELECT * FROM category')

    return categories
  }

  static async getById ({ id }) {
    const [categories] = await connnection.query('SELECT * FROM category WHERE id = ?', [id])

    if (categories.length === 0) return false

    return categories[0]
  }

  static async create ({ input }) {
    const {
      categoryName
    } = input

    try {
      await connnection.query('INSERT INTO category (category_name) VALUES (?)', [categoryName])
    } catch (error) {
      console.error(error)
      throw new Error('Error creating category')
    }

    const [categories] = await connnection.query('SELECT * FROM category WHERE category_name = ?', [categoryName])

    return categories[0]
  }

  static async delete ({ id }) {
    const [categories] = await connnection.query('DELETE FROM category WHERE id = ?', [id])

    if (categories.length === 0) return null

    return categories[0]
  }

  static async update ({ id, input }) {
    const {
      categoryName
    } = input

    try {
      await connnection.query('UPDATE category SET category_name = ? WHERE id = ?', [categoryName, id])
    } catch (e) {
      console.error(e)
      throw new Error('Error updating category')
    }

    const [categories] = await connnection.query('SELECT * FROM category WHERE id = ?', [id])

    return categories[0]
  }
}
