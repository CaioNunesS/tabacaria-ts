import { describe, expect, it } from 'vitest';
import { registerSchema, loginSchema } from './auth.schema';

describe('register user schema', () => {
  describe('when a valid body', () => {
    it('should validates a body with all fields', () => {
      const validInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
        },
      };
      const schema = registerSchema.safeParse(validInput);

      expect(schema.success).toBe(true);
    });
  });

  describe('when a invalid body', () => {
    it('should return an error for a body without "email"', () => {
      const invalidInput = {
        body: {
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Email é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body with an email without "@"', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiroprestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual('Email inválido');
      }
    });

    it('should return an error for a body with an email without ".com"', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual('Email inválido');
      }
    });

    it('should return an error for a body without "name"', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          password: 'G874KxZ763',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Name é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body with "name" empty', () => {
      const invalidInput = {
        body: {
          name: ' ',
          email: 'kevin_ribeiro@prestec.com.br',
          password: 'G874KxZ763',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O name deve ter ao menos 3 caracteres'
        );
      }
    });

    it('should return an error for a body without "password"', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          name: 'Kevin Antonio Ribeiro',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Password é um campo obrigatório'
        );
      }
    });
  });
});

describe.only('Login schema', () => {
  describe('when a valid body', () => {
    it('should validates a body with all fields', () => {
      const validInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          password: 'G874KxZ763',
        },
      };
      const schema = loginSchema.safeParse(validInput);

      expect(schema.success).toBe(true);
    });
  });

  describe('when an invalid body', () => {
    it('should return an error for a body without "email"', () => {
      const invalidInput = {
        body: {
          password: 'G874KxZ763',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Email é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body with an email without "@"', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiroprestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
        },
      };
      const schema = loginSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual('Email inválido');
      }
    });

    it('should return an error for a body with an email without ".com"', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
        },
      };
      const schema = loginSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual('Email inválido');
      }
    });

    it('should return an error for a body without "password"', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
        },
      };
      const schema = loginSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Password é um campo obrigatório'
        );
      }
    });
  });
});
