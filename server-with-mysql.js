import { createApp } from './app.js'
import { ProductModel } from './models/mysql/product.js'
import { CategoryModel } from './models/mysql/category.js'

createApp({ productModel: ProductModel, categoryModel: CategoryModel })
