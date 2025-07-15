import { useState } from 'react';
import { Plus, Search, Filter, Package, Truck, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { mockProducts, mockVendors } from '@/lib/mock-data';
import { ProductStatus } from '@/types';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const statusIcons = {
  'Manufactured': Package,
  'Shipped': Truck,
  'In Transit': Clock,
  'Delivered': CheckCircle,
};

const statusColors = {
  'Manufactured': 'bg-status-manufactured',
  'Shipped': 'bg-status-shipped',
  'In Transit': 'bg-status-transit',
  'Delivered': 'bg-status-delivered',
};

export const Products = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<ProductStatus>('Manufactured');
  const [statusNotes, setStatusNotes] = useState('');

  const isAdmin = user?.role === 'admin';

  // Filter products based on user role
  const userProducts = isAdmin 
    ? mockProducts 
    : mockProducts.filter(p => {
        const vendor = mockVendors.find(v => v.userId === user?.id);
        return vendor && p.assignedVendorId === vendor.id;
      });

  // Apply filters
  const filteredProducts = userProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getVendorName = (vendorId: string) => {
    const vendor = mockVendors.find(v => v.id === vendorId);
    return vendor?.name || 'Unknown Vendor';
  };

  const updateProductStatus = () => {
    toast({
      title: "Status Updated",
      description: `Product status updated to ${newStatus}`,
    });
    setSelectedProduct(null);
    setStatusNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            {isAdmin ? 'Manage all products in the supply chain' : 'Track your assigned products'}
          </p>
        </div>
        {isAdmin && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or SKU..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Manufactured">Manufactured</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
          <CardDescription>
            {isAdmin ? 'All products in the system' : 'Products assigned to your vendor account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                {isAdmin && <TableHead>Vendor</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead>Estimated Delivery</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const StatusIcon = statusIcons[product.status];
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.sku}</Badge>
                    </TableCell>
                    {isAdmin && (
                      <TableCell>{getVendorName(product.assignedVendorId)}</TableCell>
                    )}
                    <TableCell>
                      <Badge className={`${statusColors[product.status]} text-white`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(product.estimatedDeliveryDate, 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedProduct(product)}
                          >
                            Update Status
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Product Status</DialogTitle>
                            <DialogDescription>
                              Update the delivery status for {product.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="status">New Status</Label>
                              <Select value={newStatus} onValueChange={(value: ProductStatus) => setNewStatus(value)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Manufactured">Manufactured</SelectItem>
                                  <SelectItem value="Shipped">Shipped</SelectItem>
                                  <SelectItem value="In Transit">In Transit</SelectItem>
                                  <SelectItem value="Delivered">Delivered</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Textarea
                                id="notes"
                                placeholder="Add any additional notes about this status update..."
                                value={statusNotes}
                                onChange={(e) => setStatusNotes(e.target.value)}
                              />
                            </div>
                            <Button onClick={updateProductStatus} className="w-full">
                              Update Status
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};