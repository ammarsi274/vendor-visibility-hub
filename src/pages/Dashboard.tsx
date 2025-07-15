import { Package, Truck, Clock, CheckCircle, TrendingUp, Building2 } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { DeliveryStatusChart, MonthlyShipmentsChart, VendorPerformanceChart } from '@/components/dashboard/Charts';
import { useAuth } from '@/contexts/AuthContext';
import { mockDashboardStats, mockProducts, mockVendors } from '@/lib/mock-data';

export const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Filter data based on user role
  const userProducts = isAdmin 
    ? mockProducts 
    : mockProducts.filter(p => {
        const vendor = mockVendors.find(v => v.userId === user?.id);
        return vendor && p.assignedVendorId === vendor.id;
      });

  const stats = isAdmin ? mockDashboardStats : {
    totalProducts: userProducts.length,
    activeShipments: userProducts.filter(p => p.status === 'In Transit' || p.status === 'Shipped').length,
    onTimeDeliveries: userProducts.filter(p => p.status === 'Delivered').length,
    delayedDeliveries: 2,
    totalVendors: 1,
    avgDeliveryTime: 3.2,
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {isAdmin ? 'Admin Dashboard' : 'Vendor Dashboard'}
        </h2>
        <p className="text-muted-foreground">
          {isAdmin 
            ? 'Overview of all supply chain operations' 
            : 'Your delivery performance and assigned products'
          }
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          description={isAdmin ? "Active in system" : "Assigned to you"}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Shipments"
          value={stats.activeShipments}
          icon={Truck}
          description="Currently in transit"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="On-Time Deliveries"
          value={stats.onTimeDeliveries}
          icon={CheckCircle}
          description="This month"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Avg. Delivery Time"
          value={`${stats.avgDeliveryTime} days`}
          icon={Clock}
          description="Average completion time"
          trend={{ value: -2, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      {isAdmin && (
        <div className="grid gap-6 md:grid-cols-2">
          <DeliveryStatusChart />
          <MonthlyShipmentsChart />
        </div>
      )}

      {isAdmin && (
        <div className="grid gap-6">
          <VendorPerformanceChart />
        </div>
      )}

      {/* Recent Activity for Vendors */}
      {!isAdmin && (
        <div className="grid gap-6">
          <DeliveryStatusChart />
        </div>
      )}
    </div>
  );
};