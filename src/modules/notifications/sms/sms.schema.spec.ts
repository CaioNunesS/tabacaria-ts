import { describe, expect, it } from 'vitest';
import { smsSchema } from './sms.schema';

describe('Send sms schema', () => {
  describe('when a valid body', () => {
    it('should validates a body with all fields', () => {
      const validInput = {
        body: {
          phone: '+5511943956693',
          name: 'Hello world',
        },
      };
      const schema = smsSchema.safeParse(validInput);

      expect(schema.success).toBe(true);
    });
  });

  describe('when a invalid body', () => {
    it('should return an error for a body without "phone"', () => {
      const invalidInput = {
        body: {
          name: 'Hello world',
        },
      };
      const schema = smsSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Phone é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body without "name"', () => {
      const invalidInput = {
        body: {
          phone: '+5511943956693',
        },
      };
      const schema = smsSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Name é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body with "phone" with invalid type', () => {
      const invalidInput = {
        body: {
          phone: +5511943956693,
          name: 'Hello world',
        },
      };
      const schema = smsSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received number'
        );
      }
    });

    it('should return an error for a body with "phone" with invalid regex type: "char"', () => {
      const invalidInput = {
        body: {
          phone: 'aaaaa',
          name: 'Hello world',
        },
      };
      const schema = smsSchema.safeParse(invalidInput);

      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Número de telefone inválido'
        );
      }
    });

    it('should return an error for a body with "phone" with invalid regex type', () => {
      const invalidInput = {
        body: {
          phone: '943956693',
          name: 'Hello world',
        },
      };
      const schema = smsSchema.safeParse(invalidInput);

      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Número de telefone inválido'
        );
      }
    });

    it('should return an error for a body with "phone" with invalid regex type: "without +"', () => {
      const invalidInput = {
        body: {
          phone: '5511943956693',
          name: 'Hello world',
        },
      };
      const schema = smsSchema.safeParse(invalidInput);

      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Número de telefone inválido'
        );
      }
    });
  });
});
