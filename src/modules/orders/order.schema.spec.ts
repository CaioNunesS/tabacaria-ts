import { describe, expect, it } from 'vitest';
import { orderSchema } from './order.schema';

describe('register order schema', () => {
  describe('when a valid body', () => {
    it('should validates a body with all fields', () => {
      const validInput = {
        body: {
          products: [
            '598641f1-1b95-45c0-a11a-37958de2b63c',
            '598641f1-1b95-45c0-a11a-37958de2b63r',
          ],
          couponId: '598641f1-1b95-45c0-a11a-37958de2b63t',
        },
      };
      const schema = orderSchema.safeParse(validInput);

      expect(schema.success).toBe(true);
    });
  });

  describe('when a invalid body', () => {
    it('should return an error for a body without "products"', () => {
      const invalidInput = {
        body: {
          couponId: '598641f1-1b95-45c0-a11a-37958de2b63t',
        },
      };
      const schema = orderSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'products é um campo obrigatório'
        );
      }
    });

    it('should return an error if "products" is a number', () => {
      const invalidInput = {
        body: {
          products: 598641,
        },
      };
      const schema = orderSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected array, received number'
        );
      }
    });

    it('should return an error if "products" is not an array', () => {
      const invalidInput = {
        body: {
          products: '598641',
        },
      };
      const schema = orderSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected array, received string'
        );
      }
    });

    it('should return an error if "products" is not an array of string', () => {
      const invalidInput = {
        body: {
          products: [598641],
        },
      };
      const schema = orderSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received number'
        );
      }
    });

    it('should return an error if "couponId" is not a string', () => {
      const invalidInput = {
        body: {
          products: [
            '598641f1-1b95-45c0-a11a-37958de2b63c',
            '598641f1-1b95-45c0-a11a-37958de2b63r',
          ],
          couponId: 598641,
        },
      };
      const schema = orderSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received number'
        );
      }
    });
  });
});
