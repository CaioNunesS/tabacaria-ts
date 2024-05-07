import { describe, expect, it } from 'vitest';
import { addressSchema } from './schemas/address.schema';

describe('registering address schema', () => {
  describe('when a valid body', () => {
    it('should validates a body with all fields', () => {
      const validInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(validInput);

      expect(schema.success).toBe(true);
    });
  });

  describe('when an invalid body', () => {
    it('should return an error for a body without "street"', () => {
      const invalidInput = {
        body: {
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Rua é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body where "street" is not a string', () => {
      const invalidInput = {
        body: {
          street: ['Rua dempachi Nakayama'],
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received array'
        );
      }
    });

    it('should return an error for a body without "number"', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Número é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body where "number" is not a string', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: 471,
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received number'
        );
      }
    });

    it('should return an error for a body where "number" is not a string of numbers', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: 'abc',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O número informado é inválido. Caso tenha letras, informe nas "informações adicionais"'
        );
      }
    });

    it('should return an error for a body without "city"', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'cidade é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body where "city" is an empty string', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: '',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'cidade é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body where "city" is not a string', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: ['barueri'],
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received array'
        );
      }
    });

    it('should return an error for a body without "state"', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'estado é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body where "state" is not a string', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: ['São Paulo'],
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received array'
        );
      }
    });

    it('should return an error for a body without "neighborhood"', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'bairro é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body where "neighborhood" is not a string', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: ['Jd Esperança'],
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received array'
        );
      }
    });

    it('should return an error for a body without "zipCode"', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'cep é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body where "zipCode" is not a string', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: 64130100,
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received number'
        );
      }
    });

    it('should return an error for a body where "zipCode" is not valid (more number than required)', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '064130100',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O cep informado não é válido'
        );
      }
    });

    it('should return an error for a body where "zipCode" is not valid (less number than required)', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '0641301',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'O cep informado não é válido'
        );
      }
    });

    it('should return an error for a body where "AdditionalData" is not a string', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: [''],
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received array'
        );
      }
    });

    it('should return an error for a body without "userId"', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: '76f87722-7d87-45f8-9a42-46d429d593c3',
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'userId é um campo obrigatório'
        );
      }
    });

    it('should return an error for a body where "userId" is not a string', () => {
      const invalidInput = {
        body: {
          street: 'Rua dempachi Nakayama',
          number: '471',
          city: 'Barueri',
          state: 'São Paulo',
          neighborhood: 'Jd Esperança',
          zipCode: '06413010',
          AdditionalData: null,
          userId: ['76f87722-7d87-45f8-9a42-46d429d593c3'],
        },
      };
      const schema = addressSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Expected string, received array'
        );
      }
    });
  });
});
