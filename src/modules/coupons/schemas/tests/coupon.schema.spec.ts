import { describe, expect, it } from 'vitest';
import { couponSchema } from './schemas/coupon.schema';

describe('register coupon schema', () => {
  describe('when a valid body', () => {
    it('should validates a body with all fields', () => {
      const validInput = {
        body: {
          title: 'title',
          description: 'description',
          value: '0',
        },
      };
      const schema = couponSchema.safeParse(validInput);

      expect(schema.success).toBe(true);
    });
  });

  describe('when a invalid body', () => {
    it('should return an error for a body without "title"', () => {
      const invalidInput = {
        body: {
          description: 'description',
          value: '0',
        },
      };
      const schema = couponSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Title é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body without "description"', () => {
      const invalidInput = {
        body: {
          title: 'title',
          value: '0',
        },
      };
      const schema = couponSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Description é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body without "value"', () => {
      const invalidInput = {
        body: {
          title: 'title',
          description: 'description',
        },
      };
      const schema = couponSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Value é um campo obrigatório'
        );
      }
    });

    it('should return an error if "value" is not string', () => {
      const invalidInput = {
        body: {
          title: 'title',
          description: 'description',
          value: 0,
        },
      };
      const schema = couponSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received number'
        );
      }
    });
  });

  it('should return an error if "value" is not a válid number', () => {
    const invalidInput = {
      body: {
        title: 'title',
        description: 'description',
        value: 'ab',
      },
    };
    const schema = couponSchema.safeParse(invalidInput);

    if (!schema.success) {
      expect(schema.error.issues[0].message).toBe(
        'O campo "value" deve ser um número válido, com no máximo duas casas decimáis'
      );
    }
  });
});
