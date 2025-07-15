import { User, Vendor, Product, DeliveryStatusUpdate, DashboardStats, VendorPerformance } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@supplychain.com',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'ABC Logistics',
    email: 'contact@abclogistics.com',
    role: 'vendor',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    name: 'Global Shipping',
    email: 'info@globalshipping.com',
    role: 'vendor',
    createdAt: new Date('2024-02-01'),
  },
];

// Mock Vendors
export const mockVendors: Vendor[] = [
  {
    id: 'v1',
    name: 'ABC Logistics',
    contactEmail: 'contact@abclogistics.com',
    contactPhone: '+1-555-0123',
    address: '123 Industrial Blvd, New York, NY 10001',
    userId: '2',
    performanceMetrics: {
      onTimeDeliveryRate: 92.5,
      avgDeliveryTime: 3.2,
      totalDeliveries: 145,
      delayedDeliveries: 11,
    },
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'v2',
    name: 'Global Shipping',
    contactEmail: 'info@globalshipping.com',
    contactPhone: '+1-555-0456',
    address: '456 Port Avenue, Los Angeles, CA 90210',
    userId: '3',
    performanceMetrics: {
      onTimeDeliveryRate: 87.3,
      avgDeliveryTime: 4.1,
      totalDeliveries: 98,
      delayedDeliveries: 12,
    },
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'v3',
    name: 'Express Freight',
    contactEmail: 'orders@expressfreight.com',
    contactPhone: '+1-555-0789',
    address: '789 Commerce Street, Chicago, IL 60601',
    userId: '4',
    performanceMetrics: {
      onTimeDeliveryRate: 95.1,
      avgDeliveryTime: 2.8,
      totalDeliveries: 203,
      delayedDeliveries: 10,
    },
    createdAt: new Date('2024-01-20'),
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Industrial Components Set A',
    sku: 'ICS-001',
    description: 'High-grade industrial components for manufacturing',
    assignedVendorId: 'v1',
    status: 'Delivered',
    estimatedDeliveryDate: new Date('2024-12-10'),
    actualDeliveryDate: new Date('2024-12-09'),
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-09'),
  },
  {
    id: 'p2',
    name: 'Electronic Circuit Boards',
    sku: 'ECB-002',
    description: 'Advanced PCBs for electronic devices',
    assignedVendorId: 'v2',
    status: 'In Transit',
    estimatedDeliveryDate: new Date('2024-12-20'),
    createdAt: new Date('2024-12-05'),
    updatedAt: new Date('2024-12-14'),
  },
  {
    id: 'p3',
    name: 'Raw Materials Package',
    sku: 'RMP-003',
    description: 'Essential raw materials for production line',
    assignedVendorId: 'v3',
    status: 'Shipped',
    estimatedDeliveryDate: new Date('2024-12-18'),
    createdAt: new Date('2024-12-08'),
    updatedAt: new Date('2024-12-12'),
  },
  {
    id: 'p4',
    name: 'Safety Equipment Bundle',
    sku: 'SEB-004',
    description: 'Complete safety equipment for workplace',
    assignedVendorId: 'v1',
    status: 'Manufactured',
    estimatedDeliveryDate: new Date('2024-12-25'),
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-10'),
  },
  {
    id: 'p5',
    name: 'Automotive Parts Kit',
    sku: 'APK-005',
    description: 'Precision automotive components',
    assignedVendorId: 'v2',
    status: 'Delivered',
    estimatedDeliveryDate: new Date('2024-12-08'),
    actualDeliveryDate: new Date('2024-12-07'),
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-12-07'),
  },
  {
    id: 'p6',
    name: 'Tech Hardware Collection',
    sku: 'THC-006',
    description: 'Latest technology hardware components',
    assignedVendorId: 'v3',
    status: 'In Transit',
    estimatedDeliveryDate: new Date('2024-12-22'),
    createdAt: new Date('2024-12-12'),
    updatedAt: new Date('2024-12-15'),
  },
];

// Mock Delivery Updates
export const mockDeliveryUpdates: DeliveryStatusUpdate[] = [
  {
    id: 'du1',
    productId: 'p1',
    status: 'Delivered',
    updatedBy: '2',
    updatedAt: new Date('2024-12-09'),
    notes: 'Package delivered successfully to warehouse dock 3',
    location: 'New York Distribution Center',
  },
  {
    id: 'du2',
    productId: 'p2',
    status: 'In Transit',
    updatedBy: '3',
    updatedAt: new Date('2024-12-14'),
    notes: 'Currently in transit via Highway 101',
    location: 'California Interstate',
  },
  {
    id: 'du3',
    productId: 'p3',
    status: 'Shipped',
    updatedBy: '4',
    updatedAt: new Date('2024-12-12'),
    notes: 'Shipped via Express Air Freight',
    location: 'Chicago Processing Hub',
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalProducts: 156,
  activeShipments: 23,
  onTimeDeliveries: 142,
  delayedDeliveries: 14,
  totalVendors: 12,
  avgDeliveryTime: 3.4,
};

// Mock Vendor Performance Data
export const mockVendorPerformance: VendorPerformance[] = [
  {
    vendorId: 'v1',
    vendorName: 'ABC Logistics',
    onTimeRate: 92.5,
    avgDeliveryDays: 3.2,
    totalShipments: 145,
  },
  {
    vendorId: 'v2',
    vendorName: 'Global Shipping',
    onTimeRate: 87.3,
    avgDeliveryDays: 4.1,
    totalShipments: 98,
  },
  {
    vendorId: 'v3',
    vendorName: 'Express Freight',
    onTimeRate: 95.1,
    avgDeliveryDays: 2.8,
    totalShipments: 203,
  },
];

// Chart Data
export const deliveryStatusChart = [
  { name: 'Manufactured', value: 15, fill: 'hsl(var(--status-manufactured))' },
  { name: 'Shipped', value: 28, fill: 'hsl(var(--status-shipped))' },
  { name: 'In Transit', value: 23, fill: 'hsl(var(--status-transit))' },
  { name: 'Delivered', value: 142, fill: 'hsl(var(--status-delivered))' },
];

export const monthlyShipmentData = [
  { month: 'Jan', shipments: 45, onTime: 42, delayed: 3 },
  { month: 'Feb', shipments: 52, onTime: 48, delayed: 4 },
  { month: 'Mar', shipments: 61, onTime: 56, delayed: 5 },
  { month: 'Apr', shipments: 58, onTime: 54, delayed: 4 },
  { month: 'May', shipments: 67, onTime: 62, delayed: 5 },
  { month: 'Jun', shipments: 72, onTime: 68, delayed: 4 },
  { month: 'Jul', shipments: 69, onTime: 65, delayed: 4 },
  { month: 'Aug', shipments: 75, onTime: 71, delayed: 4 },
  { month: 'Sep', shipments: 82, onTime: 78, delayed: 4 },
  { month: 'Oct', shipments: 88, onTime: 83, delayed: 5 },
  { month: 'Nov', shipments: 91, onTime: 87, delayed: 4 },
  { month: 'Dec', shipments: 76, onTime: 72, delayed: 4 },
];

export const vendorComparisonData = [
  { name: 'ABC Logistics', onTime: 92.5, avg: 3.2 },
  { name: 'Global Shipping', onTime: 87.3, avg: 4.1 },
  { name: 'Express Freight', onTime: 95.1, avg: 2.8 },
  { name: 'Quick Transport', onTime: 89.7, avg: 3.6 },
  { name: 'Reliable Cargo', onTime: 94.2, avg: 3.0 },
];