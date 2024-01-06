import type { ProductType } from './ProductType';

export interface CartItem {
  id: string;
  quantity: number;
  product: ProductType;
}
