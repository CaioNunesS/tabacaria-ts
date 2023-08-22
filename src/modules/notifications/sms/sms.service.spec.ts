import * as SMS from './sms.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { sendSmsMock } from '../../../mocks/notification.mock';

const prismaMock = {
  Sms: {
    create: vi.fn(),
  },
};

describe('Send sms service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when sending a sms', () => {
    it('should send the sms with correct properties', async () => {
      vi.spyOn(SMS, 'sendSms').mockImplementation(async () => {
        const sms = await prismaMock.Sms.create({ data: sendSmsMock });
        return sms;
      });
      prismaMock.Sms.create.mockResolvedValue(sendSmsMock);
      const result = await SMS.sendSms(sendSmsMock);

      expect(prismaMock.Sms.create).toHaveBeenCalledWith({
        data: sendSmsMock,
      });
      expect(result).toEqual(sendSmsMock);
      expect(result).toHaveProperty('phone');
      expect(result).toHaveProperty('message');
    });

    it('should return an erro if sendSms fails', async () => {
      prismaMock.Sms.create.mockRejectedValue(new Error('Erro ao enviar sms'));

      await expect(SMS.sendSms(sendSmsMock)).rejects.toThrow(
        'Erro ao enviar sms'
      );
    });
  });
});
