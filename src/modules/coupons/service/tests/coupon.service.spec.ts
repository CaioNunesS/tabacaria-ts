import {
  createDataMock,
  queryCoupon,
  queryCouponById,
  queryCouponByTitle,
  selectMock,
} from '../../mocks/coupon.mock';
import * as Coupon from './coupon.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

export const prismaMock = {
  coupon: {
    create: vi.fn(),
    findMany: vi.fn(),
    findById: vi.fn(),
    findByTitle: vi.fn(),
  },
};

describe('Coupon Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when creating a new coupon', () => {
    it('should return the product with correct properties', async () => {
      vi.spyOn(Coupon, 'createCoupon').mockImplementation(async () => {
        const coupon = await prismaMock.coupon.create({
          data: createDataMock,
        });
        return coupon;
      });
      prismaMock.coupon.create.mockResolvedValue(createDataMock);
      const result = await Coupon.createCoupon(createDataMock);

      expect(prismaMock.coupon.create).toHaveBeenCalledWith({
        data: createDataMock,
      });
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('value');
      expect(result).toEqual(createDataMock);
    });

    it('should return an error if create request fails', async () => {
      prismaMock.coupon.create.mockRejectedValue(
        new Error('create coupon failed')
      );

      await expect(Coupon.createCoupon(createDataMock)).rejects.toThrow(
        'create coupon failed'
      );
    });

    it('should return an  error if title already exists', async () => {
      vi.spyOn(Coupon, 'createCoupon').mockImplementation(async () => {
        const coupon = await prismaMock.coupon.create({
          data: createDataMock,
        });
        return coupon;
      });
      prismaMock.coupon.create.mockResolvedValue(createDataMock);
      await Coupon.createCoupon(createDataMock);

      prismaMock.coupon.create.mockRejectedValue(
        new Error('coupon already exists')
      );
      expect(async () => {
        await Coupon.createCoupon(createDataMock);
      }).rejects.toThrow('coupon already exists');
    });
  });

  describe('when query an coupon', () => {
    it('should querys coupons with default options', async () => {
      vi.spyOn(Coupon, 'findAllCoupons').mockImplementation(async () => {
        const coupon = await prismaMock.coupon.findMany({
          where: { revoked: false },
          select: selectMock,
          skip: 0,
          take: 10,
          orderBy: undefined,
        });

        return coupon;
      });

      const filter = { revoked: false };
      const keys: (
        | 'id'
        | 'title'
        | 'description'
        | 'value'
        | 'createdAt'
        | 'updatedAt'
      )[] = ['id', 'title', 'description', 'value', 'createdAt', 'updatedAt'];
      prismaMock.coupon.findMany.mockResolvedValue(queryCoupon);

      const result = await Coupon.findAllCoupons(filter, {}, keys);

      expect(result).toEqual(queryCoupon);
      expect(prismaMock.coupon.findMany).toHaveBeenCalledWith({
        where: filter,
        select: selectMock,
        skip: 0,
        take: 10,
        orderBy: undefined,
      });
    });

    it('should return an empty array if no coupon is found', async () => {
      const filter = { revoked: false };
      const keys: (
        | 'id'
        | 'title'
        | 'description'
        | 'value'
        | 'createdAt'
        | 'updatedAt'
      )[] = ['id', 'title', 'description', 'value', 'createdAt', 'updatedAt'];
      prismaMock.coupon.findMany.mockResolvedValue([]);

      const result = await Coupon.findAllCoupons(filter, {}, keys);

      expect(result).toEqual([]);
    });

    it('should correctly apply the limit and page options', async () => {
      const filter = { revoked: false };
      const options = { limit: 5, page: 2 };
      const keys: (
        | 'id'
        | 'title'
        | 'description'
        | 'value'
        | 'createdAt'
        | 'updatedAt'
      )[] = ['id', 'title', 'description', 'value', 'createdAt', 'updatedAt'];
      vi.spyOn(Coupon, 'findAllCoupons').mockImplementation(async () => {
        const coupon = await prismaMock.coupon.findMany({
          where: { revoked: false },
          select: selectMock,
          skip: 5,
          take: options.limit,
          orderBy: undefined,
        });
        return coupon;
      });

      await Coupon.findAllCoupons(filter, options, keys);

      expect(prismaMock.coupon.findMany).toHaveBeenCalledWith({
        where: filter,
        select: selectMock,
        skip: 5,
        take: options.limit,
        orderBy: undefined,
      });
    });
  });

  describe('when get coupon by id', async () => {
    it('should gets an coupon by id', async () => {
      vi.spyOn(Coupon, 'findCouponById').mockImplementation(async () => {
        const coupon = await prismaMock.coupon.findById({
          where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
          select: selectMock,
        });
        return coupon;
      });
      prismaMock.coupon.findById.mockResolvedValue(queryCouponById);
      const result = await Coupon.findCouponById(
        '598641f1-1b95-45c0-a11a-37958de2b63c'
      );

      expect(result).toEqual(queryCouponById);
      expect(prismaMock.coupon.findById).toHaveBeenCalledWith({
        where: { id: '598641f1-1b95-45c0-a11a-37958de2b63c' },
        select: selectMock,
      });
    });

    it('should throw an error if no coupon is found', async () => {
      prismaMock.coupon.findById.mockRejectedValue(
        new Error('Coupon not found')
      );

      await expect(
        Coupon.findCouponById('598641f1-1b95-45c0-a11a-37958de2b63c')
      ).rejects.toThrow('Coupon not found');
    });
  });

  describe('when get coupon by title', async () => {
    it('should gets an coupon by title', async () => {
      vi.spyOn(Coupon, 'findCouponByTitle').mockImplementation(async () => {
        const coupon = await prismaMock.coupon.findByTitle({
          where: { title: 'teste' },
          select: selectMock,
        });
        return coupon;
      });
      prismaMock.coupon.findByTitle.mockResolvedValue(queryCouponByTitle);
      const result = await Coupon.findCouponByTitle('teste');

      expect(result).toEqual(queryCouponByTitle);
      expect(prismaMock.coupon.findByTitle).toHaveBeenCalledWith({
        where: { title: 'teste' },
        select: selectMock,
      });
    });

    it('should throw an error if no coupon is found', async () => {
      prismaMock.coupon.findByTitle.mockRejectedValue(
        new Error('Coupon not found')
      );

      await expect(Coupon.findCouponByTitle('teste')).rejects.toThrow(
        'Coupon not found'
      );
    });
  });
});
