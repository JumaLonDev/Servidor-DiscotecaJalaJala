import mysql from 'mysql2/promise'
import { DEFAULT_CONFIG } from '../../dbConection/config.js'

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(connectionString)

export class ProductModel {
  static async getAll () {
    const [products] = await connection.query(
      'SELECT BIN_TO_UUID(p.id), c.category_name, p.product_name, p.product_price, p.product_image, p.product_state FROM product p INNER JOIN product_categories pc ON pc.product_id = p.id INNER JOIN category c ON c.id = pc.category_id;'
    )

    return products
  }

  static async getById ({ id }) {
    const [products] = await connection.query(
      'SELECT BIN_TO_UUID(p.id), c.category_name, p.product_name, p.product_price, p.product_image, p.product_state FROM product p INNER JOIN product_categories pc ON pc.product_id = p.id INNER JOIN category c ON c.id = pc.category_id WHERE p.id = UUID_TO_BIN(?);', [id]
    )

    if (products.length === 0) return null

    return products[0]
  }

  static async create ({ input }) {
    const {
      productName,
      productPrice,
      productImage,
      productState
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(`INSERT INTO product (id, product_name, product_price, product_image, product_state) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?);`, [productName, productPrice, productImage, productState])
    } catch (e) {
      throw new Error('Error creating product.')
    }

    const [products] = await connection.query('SELECT BIN_TO_UUID(id), product_name, product_price, product_image, product_state FROM product WHERE id = UUID_TO_BIN(?);', [uuid])

    return products[0]
  }

  static async delete ({ id }) {
    const [products] = await connection.query('DELETE FROM product WHERE id = UUID_TO_BIN(?);', [id])

    if (products.length === 0) return null

    return products[0]
  }

  static async update ({ id, input }) {
    const {
      productName,
      productPrice,
      productImage,
      productState
    } = input

    // Prepare an object to hold update data
    const updateData = {}
    if (productName !== undefined) updateData.product_name = productName
    if (productPrice !== undefined) updateData.product_price = productPrice
    if (productImage !== undefined) updateData.product_image = productImage
    if (productState !== undefined) updateData.product_state = productState

    // Construct the SET clause dynamically based on updateData
    const setClause = Object.keys(updateData).map((key) => `${key} = ?`).join(', ')

    try {
      await connection.query(`
        UPDATE product
        SET ${setClause}
        WHERE id = UUID_TO_BIN(?);
      `, [...Object.values(updateData), id])
    } catch (e) {
      throw new Error('Error updating product.')
    }

    const [products] = await connection.query('SELECT BIN_TO_UUID(id), product_name, product_price, product_image, product_state FROM product WHERE id = UUID_TO_BIN(?);', [id])

    return products[0]
  }
}
