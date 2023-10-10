import { Response, Request } from 'express';
import {
  createAddress,
  deleteAddress,
  findAddressByUserId,
  updateAddress,
} from './address.service';

export const create = async (req: Request, res: Response) => {
  const {
    street,
    city,
    neighborhood,
    number,
    zipCode,
    AdditionalData,
    state,
    userId,
  } = req.body;

  const result = await createAddress({
    street,
    city,
    state,
    neighborhood,
    number,
    zipCode,
    AdditionalData,
    userId,
  });

  return res.json({ data: result });
};

export const findAddressesByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await findAddressByUserId(userId);

  return res.json({ data: result });
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    street,
    city,
    neighborhood,
    number,
    zipCode,
    AdditionalData,
    state,
    userId,
  } = req.body;

  const data = {
    street,
    city,
    neighborhood,
    number,
    zipCode,
    AdditionalData,
    state,
    userId,
  };

  const result = await updateAddress(id, data);

  return res.json({ data: result });
};

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteAddress(id);

  return res.status(204);
};
