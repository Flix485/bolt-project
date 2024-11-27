export interface BaseProduct {
  id: string;
  ean: string;
  name: string;
  type: 'configurable' | 'simple';
}

export interface ConfigurableProduct extends BaseProduct {
  type: 'configurable';
  variants: SimpleProduct[];
}

export type ProductCondition = 'new' | 'perfect' | 'good' | 'fair';

export interface SimpleProduct extends BaseProduct {
  type: 'simple';
  condition: ProductCondition;
  price: number;
  vat: number; // 20 for new products, 0 for used
  stock: number;
  parentId?: string; // Reference to the configurable product
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
}

export interface Transaction {
  id: string;
  date: Date;
  products: Array<{
    product: SimpleProduct;
    quantity: number;
  }>;
  total: number;
  paymentMethod: 'cash' | 'card' | 'check';
  customer?: Customer;
}

export interface Seller {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  documentType: string;
  documentNumber: string;
}

export interface PurchaseProduct {
  ean: string;
  name: string;
  serialNumber: string;
  quantity: number;
  purchasePrice: number;
  estimatedSellingPrice: number;
  condition: ProductCondition;
}

export interface Purchase {
  id: string;
  date: Date;
  seller: Seller;
  products: PurchaseProduct[];
  totalAmount: number;
  paymentMethod: 'cash' | 'card' | 'check';
}