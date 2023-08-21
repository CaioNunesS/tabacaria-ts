import { describe, expect, it } from 'vitest'
import { productSchema } from './product.schema'

describe('register schema', () => {
  describe('when a valid body', () => {
    it('should validates a body with all fields', () => {
      const validInput = {
        body: {
          name: 'Produto',
          price: '10.00',
          description: 'Produto x',
        },
      }
      const schema = productSchema.safeParse(validInput)

      expect(schema.success).toBe(true)
    })
  })

  describe('when a invalid body', () => {
    it('should return an error for a body without "name"', () => {
      const invalidInput = {
        body: {
          price: '10.00',
          description: 'Produto x',
        },
      }
      const schema = productSchema.safeParse(invalidInput)
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual('Name é obrigatório')
      }

      it('should return an error for a body without "price"', () => {
        const invalidInput = {
          body: {
            name: 'Produto',
            description: 'Produto x',
          },
        }
        const schema = productSchema.safeParse(invalidInput)
        if (!schema.success) {
          expect(schema.error.issues[0].message).toEqual('Price é obrigatório')
        }
      })
    })

    it('should return an error for a body without "description"', () => {
      const invalidInput = {
        body: {
          name: 'Produto',
          price: '10.00',
        },
      }
      const schema = productSchema.safeParse(invalidInput)
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Description é obrigatório',
        )
      }
    })

    it('should return an error if "price" is not a string', () => {
      const invalidInput = {
        body: {
          name: 'Produto',
          price: 10.0,
          description: 'Produto x',
        },
      }
      const schema = productSchema.safeParse(invalidInput)
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received number',
        )
      }
    })

    it('should return an error if "price" is not a válid number', () => {
      const invalidInput = {
        body: {
          name: 'Produto',
          price: '1ed',
          description: 'Produto x',
        },
      }
      const schema = productSchema.safeParse(invalidInput)

      if (!schema.success) {
        expect(schema.error.issues[0].message).toBe(
          'o campo "price" deve ser um número válido, com no máximo duas casas decimáis',
        )
      }
    })
  })
})
