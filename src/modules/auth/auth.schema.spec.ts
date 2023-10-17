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
          phoneNumber: '11943956693',
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
          phoneNumber: '11943956693',
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
          phoneNumber: '11943956693',
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
          phoneNumber: '11943956693',
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
          phoneNumber: '11943956693',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Nome é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body with "name" empty', () => {
      const invalidInput = {
        body: {
          name: ' ',
          email: 'kevin_ribeiro@prestec.com.br',
          password: 'G874KxZ763',
          phoneNumber: '11943956693',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Nome é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body without "password"', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          phoneNumber: '11943956693',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Senha é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body without "phoneNumber"', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O phoneNumber é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body with an invalid cell phone phoneNumber (too much numbers) ', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
          phoneNumber: '1194395669',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O telefone informado é inválido'
        );
      }
    });

    it('should return an error for a body with an invalid cell phone phoneNumber (few numbers) ', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
          phoneNumber: '119439566934',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O telefone informado é inválido'
        );
      }
    });

    it('should return an error for a body with an invalid cell phone phoneNumber (without 9) ', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
          phoneNumber: '11843956693',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O telefone informado é inválido'
        );
      }
    });

    it('should return an error for a body with an invalid landline phoneNumber (too much numbers)', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
          phoneNumber: '11439566934',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O telefone informado é inválido'
        );
      }
    });

    it('should return an error for a body with an invalid landline phoneNumber (few numbers)', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
          phoneNumber: '114395669',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O telefone informado é inválido'
        );
      }
    });

    it('should return an error for a body with an invalid phoneNumber (char)', () => {
      const invalidInput = {
        body: {
          email: 'kevin_ribeiro@prestec.com.br',
          name: 'Kevin Antonio Ribeiro',
          password: 'G874KxZ763',
          phoneNumber: 'abacate',
        },
      };
      const schema = registerSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O telefone informado é inválido'
        );
      }
    });
  });
});

describe('Login schema', () => {
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
      const schema = loginSchema.safeParse(invalidInput);
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
        expect(schema.error.issues[0].message).toEqual(
          'Senha ou email incorretos'
        );
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
        expect(schema.error.issues[0].message).toEqual(
          'Senha ou email incorretos'
        );
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
          'Senha é um campo obrigatório'
        );
      }
    });
  });
});
