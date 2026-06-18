export enum ProductCategory {
  Fruits = "fruits",
  Vegetables = "vegetables",
  Dairy = "dairy",
  Bakery = "bakery",
  Meat = "meat",
  Beverages = "beverages",
}

export enum OrderStatus {
  Idle = "idle",
  Success = "success",
  Failed = "failed",
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  image: string;
  rating: number;
  origin: string;
  description: string;
  nutrition: string[];
  tags: string[];
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface Category {
  id: ProductCategory;
  label: string;
  image: string;
  color: string;
}
