import z from 'zod'

const categorySchema = z.object({
  categoryName: z.string({
    invalid_type_error: 'Category name must be a string',
    required_error: 'Category name is required.'
  })
})

export function validateCategory (input) {
  return categorySchema.safeParse(input)
}

export function validatePartialCategory (input) {
  return categorySchema.partial().safeParse(input)
}
