import { findProductById } from '../../products/services';

type IsumProductsPrice = {
  products: string[];
  valueDiscount: number;
};

export const sumProductsPrice = async ({
  products,
  valueDiscount,
}: IsumProductsPrice) => {
  let productPrice = 0;

  for (const productId of products) {
    const product = await findProductById(productId);
    if (product) {
      productPrice += Number.parseFloat(product.price);
    }
  }
  if (productPrice - (valueDiscount ?? 0) <= 0) {
    return '0.00';
  }
  return (productPrice - (valueDiscount ?? 0)).toFixed(2);
};
