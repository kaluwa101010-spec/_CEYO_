export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Tops' | 'Outerwear' | 'Trousers' | 'Accessories';
  gender?: 'Men' | 'Women' | 'Unisex';
  subtitle: string;
  description: string;
  details?: string[];
  fabricCare?: string[];
  sustainability?: string[];
  primaryImage: string;
  secondaryImage: string;
  tag?: string;
  tagType?: 'new' | 'bestseller' | 'drop' | 'architectural' | 'core';
  colors: { name: string; hex: string; atelierCode?: string }[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  sku: string;
  fit?: 'Oversized' | 'Relaxed' | 'Tailored' | 'Boxy';
  gsm?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export type ScreenType = 'home' | 'shop' | 'product' | 'checkout' | 'confirmation';

export interface Currency {
  code: 'USD' | 'EUR' | 'GBP' | 'JPY';
  symbol: string;
  rate: number; // vs USD
}

export interface OrderConfirmationData {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
}
