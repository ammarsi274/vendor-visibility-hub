import { Truck, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockProducts, mockVendors } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

const statusIcons = {
  'Manufactured': Clock,
  'Shipped': Truck,
  'In Transit': MapPin,
  'Delivered': CheckCircle,
};

export const Deliveries = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const userProducts = isAdmin 
    ? mockProducts 
    : mockProducts.filter(p => {
        const vendor = mockVendors.find(v => v.userId === user?.id);
        return vendor && p.assignedVendorId === vendor.id;
      });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Deliveries</h2>
        <p className="text-muted-foreground">Track delivery status and timeline</p>
      </div>

      <div className="grid gap-4">
        {userProducts.map((product) => {
          const StatusIcon = statusIcons[product.status];
          const vendor = mockVendors.find(v => v.id === product.assignedVendorId);
          
          return (
            <Card key={product.id} className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge className={`bg-status-${product.status.toLowerCase().replace(' ', '-')} text-white`}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {product.status}
                  </Badge>
                </div>
                <CardDescription>SKU: {product.sku}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium">Vendor</p>
                    <p className="text-sm text-muted-foreground">{vendor?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {format(product.estimatedDeliveryDate, 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {format(product.updatedAt, 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};