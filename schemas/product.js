import z from 'zod'

const productSchema = z.object({
  productName: z.string({
    invalid_type_error: 'Product name must be a string',
    required_error: 'Product name is required.'
  }),
  productPrice: z.number().int(),
  productCategoryId: z.number().int(),
  productImage: z.string().url({
    message: 'Image must be a valid URL'
  }),
  productState: z.boolean()
})

export function validateProduct (input) {
  return productSchema.safeParse(input)
}

export function validatePartialProduct (input) {
  return productSchema.partial().safeParse(input)
}
