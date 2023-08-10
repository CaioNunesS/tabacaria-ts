import { db } from '../../config/index'
import { throwError } from '../../utils/index'

type IcreateCoupon = {
  title: string
  description: string
  value: string
}

export const createCoupon = async ({
  title,
  description,
  value,
}: IcreateCoupon) => {}
