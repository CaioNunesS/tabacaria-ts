import { sendMailSchema } from './email.schema';
import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

describe('Send email schema', () => {
  describe('when a valid body', () => {
    it('should validates a body with all fields', () => {
      const validInput = {
        body: {
          name: faker.person.fullName(),
          to: faker.internet.email(),
          subject: faker.lorem.lines(),
        },
      };
      const schema = sendMailSchema.safeParse(validInput);

      expect(schema.success).toBe(true);
    });
  });

  describe('when a invalid body', () => {
    it('should return an error for a body without "name"', () => {
      const invalidInput = {
        body: {
          to: faker.internet.email(),
          subject: faker.lorem.lines(),
        },
      };
      const schema = sendMailSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Campo name é obrigatório'
        );
      }
    });

    it('should return an error for a body without "to"', () => {
      const invalidInput = {
        body: {
          name: faker.person.fullName(),
          subject: faker.lorem.lines(),
        },
      };
      const schema = sendMailSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Campo to é obrigatório'
        );
      }
    });

    it('should return an error for a body without "subject"', () => {
      const invalidInput = {
        body: {
          name: faker.person.fullName(),
          to: faker.internet.email(),
        },
      };
      const schema = sendMailSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Campo subject é obrigatório'
        );
      }
    });

    it('should return an error for a body with "to" with invalid regex type', () => {
      const invalidInput = {
        body: {
          name: faker.person.fullName(),
          to: 'example@email',
          subject: faker.lorem.lines(),
        },
      };
      const schema = sendMailSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Formato de email inválido'
        );
      }
    });

    it('should return an error for a body with "to" with invalid regex type', () => {
      const invalidInput = {
        body: {
          name: faker.person.fullName(),
          to: 'example@email.com ',
          subject: faker.lorem.lines(),
        },
      };
      const schema = sendMailSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Formato de email inválido'
        );
      }
    });

    it('should return an error for a body with "to" with invalid regex type', () => {
      const invalidInput = {
        body: {
          name: faker.person.fullName(),
          to: 'exampleemail.com',
          subject: faker.lorem.lines(),
        },
      };
      const schema = sendMailSchema.safeParse(invalidInput);
      if (!schema.success) {
        expect(schema.error.issues[0].message).toEqual(
          'Formato de email inválido'
        );
      }
    });
  });
});
