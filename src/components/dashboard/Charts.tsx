import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { deliveryStatusChart, monthlyShipmentData, vendorComparisonData } from '@/lib/mock-data';

const chartConfig = {
  shipments: {
    label: "Shipments",
    color: "hsl(var(--chart-1))",
  },
  onTime: {
    label: "On Time",
    color: "hsl(var(--chart-2))",
  },
  delayed: {
    label: "Delayed",
    color: "hsl(var(--chart-4))",
  },
  manufactured: {
    label: "Manufactured",
    color: "hsl(var(--status-manufactured))",
  },
  shipped: {
    label: "Shipped",
    color: "hsl(var(--status-shipped))",
  },
  transit: {
    label: "In Transit",
    color: "hsl(var(--status-transit))",
  },
  delivered: {
    label: "Delivered",
    color: "hsl(var(--status-delivered))",
  },
};

export const DeliveryStatusChart = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Delivery Status Distribution</CardTitle>
        <CardDescription>Current status of all products in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deliveryStatusChart}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {deliveryStatusChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const MonthlyShipmentsChart = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Monthly Shipment Trends</CardTitle>
        <CardDescription>On-time vs delayed deliveries by month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyShipmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="onTime" fill="hsl(var(--chart-2))" name="On Time" />
              <Bar dataKey="delayed" fill="hsl(var(--chart-4))" name="Delayed" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const VendorPerformanceChart = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Vendor Performance Comparison</CardTitle>
        <CardDescription>On-time delivery rates by vendor</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendorComparisonData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="onTime" fill="hsl(var(--chart-1))" name="On-Time Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};