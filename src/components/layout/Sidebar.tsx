import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  Truck, 
  Users, 
  LayoutDashboard,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'vendor'],
  },
  {
    name: 'Products',
    href: '/products',
    icon: Package,
    roles: ['admin', 'vendor'],
  },
  {
    name: 'Deliveries',
    href: '/deliveries',
    icon: Truck,
    roles: ['admin', 'vendor'],
  },
  {
    name: 'Vendors',
    href: '/vendors',
    icon: Building2,
    roles: ['admin'],
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    roles: ['admin'],
  },
];

export const Sidebar = () => {
  const { user } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r shadow-sm">
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};