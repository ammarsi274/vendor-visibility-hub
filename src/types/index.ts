// Supply Chain Tracker Types

export type UserRole = 'admin' | 'vendor';

export type ProductStatus = 'Manufactured' | 'Shipped' | 'In Transit' | 'Delivered';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  userId: string;
  performanceMetrics: {
    onTimeDeliveryRate: number;
    avgDeliveryTime: number;
    totalDeliveries: number;
    delayedDeliveries: number;
  };
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  assignedVendorId: string;
  status: ProductStatus;
  estimatedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryStatusUpdate {
  id: string;
  productId: string;
  status: ProductStatus;
  updatedBy: string;
  updatedAt: Date;
  notes?: string;
  location?: string;
}

export interface DeliveryHistory {
  productId: string;
  updates: DeliveryStatusUpdate[];
}

export interface DashboardStats {
  totalProducts: number;
  activeShipments: number;
  onTimeDeliveries: number;
  delayedDeliveries: number;
  totalVendors: number;
  avgDeliveryTime: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface VendorPerformance {
  vendorId: string;
  vendorName: string;
  onTimeRate: number;
  avgDeliveryDays: number;
  totalShipments: number;
}