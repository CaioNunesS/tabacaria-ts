import {
  createDataMock,
  queryAddressById,
  selectMock,
} from '../../mocks/address.mock';
import * as Address from '../address/services';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { products } from '../../mocks/product.mock';

export const prismaMock = {
  address: {
    create: vi.fn(),
    findByUserId: vi.fn(),
    findById: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
  user: {
    findById: vi.fn(),
  },
};

describe('Address Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when registering a new user', () => {
    it('should return the address with correct properties', async () => {
      vi.spyOn(Address, 'createAddress').mockImplementation(async () => {
        await prismaMock.user.findById(createDataMock.id);
        const address = await prismaMock.address.create({
          data: createDataMock,
        });
        return address;
      });

      prismaMock.address.create.mockResolvedValue(createDataMock);

      const result = await Address.createAddress(createDataMock);

      expect(prismaMock.address.create).toHaveBeenCalledWith({
        data: createDataMock,
      });
      expect(result).toEqual(createDataMock);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('street');
      expect(result).toHaveProperty('city');
      expect(result).toHaveProperty('state');
      expect(result).toHaveProperty('neighborhood');
      expect(result).toHaveProperty('number');
      expect(result).toHaveProperty('zipCode');
      expect(result).toHaveProperty('userId');
      expect(result).toHaveProperty('AdditionalData');
      expect(result).toHaveProperty('active');
      expect(result).toHaveProperty('updatedAt');
      expect(result).toHaveProperty('createdAt');
    });

    it('should return an error if create request fails', async () => {
      prismaMock.address.create.mockRejectedValue(
        new Error('create address failed')
      );
      await expect(Address.createAddress(createDataMock)).rejects.toThrow(
        'create address failed'
      );
    });
  });

  describe('when delete address', () => {
    vi.spyOn(Address, 'deleteAddress').mockImplementation(async () => {
      const address = await prismaMock.address.delete({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
      });
      return address;
    });
    prismaMock.address.delete.mockResolvedValue(queryAddressById);

    it('should delete an address', async () => {
      await Address.deleteAddress('598641f1-1b95-45c0-a11a-37958de2b63c');
      expect(prismaMock.address.delete).toHaveBeenCalledWith({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
      });
    });

    it('should throw an error if address not found', async () => {
      prismaMock.address.findById.mockResolvedValue(null);
      prismaMock.address.delete.mockRejectedValue(
        new Error('address not found')
      );

      await expect(
        Address.deleteAddress('598641f1-1b95-45c0-a11a-37958de2b63c')
      ).rejects.toThrow(new Error('address not found'));
    });
  });

  describe('when update an order', () => {
    vi.spyOn(Address, 'updateAddress').mockImplementation(async () => {
      const address = await prismaMock.address.update({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        data: { active: false },
      });
      return address;
    });
    prismaMock.address.findById.mockResolvedValue(queryAddressById);

    it('should updates an address', async () => {
      const updateBody = { active: false };
      prismaMock.address.update.mockResolvedValue({
        ...queryAddressById,
        ...updateBody,
      });
      prismaMock.address.findById.mockResolvedValue(queryAddressById);

      const result = await Address.updateAddress(
        '598641f1-1b95-45c0-a11a-37958de2b63c',
        updateBody
      );

      expect(result).toEqual({ ...queryAddressById, ...updateBody });
    });

    it('should throws an error is the address is not found', async () => {
      const updateBody = { active: false };

      prismaMock.address.update.mockRejectedValue(
        new Error('Address not found')
      );

      await expect(
        Address.updateAddress(
          '598641f1-1b95-45c0-a11a-37958de2b63c',
          updateBody
        )
      ).rejects.toThrow(new Error('Address not found'));
    });
  });

  describe('when query an address by id', async () => {
    it('should gets an address by id', async () => {
      vi.spyOn(Address, 'findAddressById').mockImplementation(async () => {
        const address = await prismaMock.address.findById({
          where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
          select: selectMock,
        });
        return address;
      });
      prismaMock.address.findById.mockResolvedValue(queryAddressById);
      const result = await Address.findAddressById(
        '598641f1-1b95-45c0-a11a-37958de2b63c'
      );

      expect(result).toEqual(queryAddressById);
      expect(prismaMock.address.findById).toHaveBeenCalledWith({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        select: selectMock,
      });
    });

    it('should throw an error if no product is found', async () => {
      prismaMock.address.findById.mockRejectedValue(
        new Error('Address not found')
      );

      await expect(
        Address.findAddressById('598641f1-1b95-45c0-a11a-37958de2b63c')
      ).rejects.toThrow('Address not found');
    });
  });

  describe('when querying addresses', () => {
    it('should query addresses with default options', async () => {
      vi.spyOn(Address, 'findAddressByUserId').mockImplementation(async () => {
        const addresses = await prismaMock.address.findByUserId({
          where: { userId: '76f87722-7d87-45f8-9a42-46d429d593c3' },
          select: selectMock,
        });

        return addresses;
      });
      const keys: (
        | 'id'
        | 'street'
        | 'city'
        | 'state'
        | 'neighborhood'
        | 'number'
        | 'zipCode'
        | 'AdditionalData'
        | 'userId'
        | 'createdAt'
        | 'updatedAt'
        | 'active'
      )[] = [
        'id',
        'street',
        'city',
        'state',
        'neighborhood',
        'number',
        'zipCode',
        'AdditionalData',
        'userId',
        'createdAt',
        'updatedAt',
        'active',
      ];
      prismaMock.address.findByUserId.mockResolvedValue(products);

      const result = await Address.findAddressByUserId(
        '76f87722-7d87-45f8-9a42-46d429d593c3',
        keys
      );

      expect(result).toEqual(products);
    });
  });
});
