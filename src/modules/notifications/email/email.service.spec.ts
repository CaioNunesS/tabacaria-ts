import * as EMAIL from './email.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  sendMailMock,
  createTransportMock,
} from '../../../mocks/notification.mock';
import { SentMessageInfo, Transporter, createTransport } from 'nodemailer';

const prismaMock = {
  Email: {
    create: vi.fn(),
  },
};

describe('Send email service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when sending an email', () => {
    it('should send an email with correct properties', async () => {
      vi.spyOn(EMAIL, 'sendMail').mockImplementation(async () => {
        const email = await prismaMock.Email.create({ data: sendMailMock });
        return email;
      });
      prismaMock.Email.create.mockResolvedValue(sendMailMock);
      const result = await EMAIL.sendMail(sendMailMock);

      expect(prismaMock.Email.create).toHaveBeenCalledWith({
        data: sendMailMock,
      });
      expect(result).toEqual(sendMailMock);
      expect(result).toHaveProperty('to');
      expect(result).toHaveProperty('subject');
      expect(result).toHaveProperty('html');
    });

    it('should return an error if sendMail fails', async () => {
      prismaMock.Email.create.mockRejectedValue(
        new Error('Error ao enviar email')
      );

      await expect(EMAIL.sendMail(sendMailMock)).rejects.toThrow(
        'Error ao enviar email'
      );
    });
  });

  describe('sending mail config', () => {
    describe('when setting email configuration', () => {
      it('should return email transporter created', () => {
        const mailConfig: SentMessageInfo = createTransportMock;
        const transporter: Transporter<SentMessageInfo> =
          createTransport(mailConfig);

        expect(transporter).not.toBeNull();
        expect(transporter.options).toMatchObject(mailConfig);
      });
    });
  });
});
