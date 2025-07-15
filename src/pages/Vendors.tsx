import { Building2, Mail, Phone, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockVendors } from '@/lib/mock-data';

export const Vendors = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Vendors</h2>
        <p className="text-muted-foreground">Manage vendor relationships and performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockVendors.map((vendor) => (
          <Card key={vendor.id} className="shadow-card">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-lg">{vendor.name}</CardTitle>
                  <CardDescription>Vendor Partner</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{vendor.contactEmail}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{vendor.contactPhone}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>On-Time Delivery Rate</span>
                    <span className="font-medium">{vendor.performanceMetrics.onTimeDeliveryRate}%</span>
                  </div>
                  <Progress value={vendor.performanceMetrics.onTimeDeliveryRate} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Deliveries</p>
                    <p className="font-medium">{vendor.performanceMetrics.totalDeliveries}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg. Time</p>
                    <p className="font-medium">{vendor.performanceMetrics.avgDeliveryTime} days</p>
                  </div>
                </div>
              </div>
              
              <Badge variant={vendor.performanceMetrics.onTimeDeliveryRate > 90 ? "default" : "secondary"}>
                <TrendingUp className="mr-1 h-3 w-3" />
                {vendor.performanceMetrics.onTimeDeliveryRate > 90 ? "Excellent" : "Good"} Performance
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};