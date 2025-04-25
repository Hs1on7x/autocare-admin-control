
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Car,
  Users,
  Calendar,
  Settings,
  Package,
  Tag,
  CreditCard,
  Clock,
  Mail,
  FileText,
  Home,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ShoppingCart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start mb-1 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
      )}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  </Link>
);

interface NavGroupProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavGroup = ({ label, icon, children }: NavGroupProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-1">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <div className="flex items-center">
            {icon}
            <span className="ml-2">{label}</span>
          </div>
          <ChevronDown
            className={cn('h-4 w-4 shrink-0 transition-transform duration-200', {
              'transform rotate-180': open,
            })}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 border-l-2 border-sidebar-accent ml-4 mt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const AutoCareSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  return (
    <div
      className={cn(
        'bg-sidebar h-screen bg-sidebar flex flex-col overflow-y-auto border-r border-sidebar-border transition-all',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-xl font-bold text-sidebar-foreground">AutoCare</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>
      
      <div className="flex-1 p-3">
        {collapsed ? (
          // Collapsed view
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'text-sidebar-foreground hover:bg-sidebar-accent',
                  location.pathname === '/dashboard' && 'bg-sidebar-primary'
                )}
              >
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/service-providers">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'text-sidebar-foreground hover:bg-sidebar-accent',
                  location.pathname.includes('service-providers') && 'bg-sidebar-primary'
                )}
              >
                <Users className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/bookings">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'text-sidebar-foreground hover:bg-sidebar-accent',
                  location.pathname.includes('bookings') && 'bg-sidebar-primary'
                )}
              >
                <Calendar className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/vehicle-types">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'text-sidebar-foreground hover:bg-sidebar-accent',
                  location.pathname.includes('vehicle-types') && 'bg-sidebar-primary'
                )}
              >
                <Car className="h-5 w-5" />
              </Button>
            </Link>
            {/* More collapsed icons */}
          </div>
        ) : (
          // Expanded view
          <div>
            <NavItem
              to="/dashboard"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              isActive={location.pathname === '/dashboard'}
            />
            
            <NavGroup label="Management" icon={<Settings className="h-5 w-5" />}>
              <NavItem
                to="/service-providers"
                icon={<Users className="h-5 w-5" />}
                label="Service Providers"
                isActive={location.pathname.includes('service-providers')}
              />
              <NavItem
                to="/users"
                icon={<Users className="h-5 w-5" />}
                label="Users"
                isActive={location.pathname.includes('users')}
              />
              <NavItem
                to="/bookings"
                icon={<Calendar className="h-5 w-5" />}
                label="Bookings"
                isActive={location.pathname.includes('bookings')}
              />
              <NavItem
                to="/orders"
                icon={<ShoppingCart className="h-5 w-5" />}
                label="Orders"
                isActive={location.pathname.includes('orders')}
              />
            </NavGroup>
            
            <NavGroup label="Configuration" icon={<Settings className="h-5 w-5" />}>
              <NavItem
                to="/vehicle-types"
                icon={<Car className="h-5 w-5" />}
                label="Vehicle Types"
                isActive={location.pathname.includes('vehicle-types')}
              />
              <NavItem
                to="/services"
                icon={<Package className="h-5 w-5" />}
                label="Services"
                isActive={location.pathname.includes('services')}
              />
              <NavItem
                to="/banners"
                icon={<FileText className="h-5 w-5" />}
                label="Banners"
                isActive={location.pathname.includes('banners')}
              />
              <NavItem
                to="/coupons"
                icon={<Tag className="h-5 w-5" />}
                label="Coupons"
                isActive={location.pathname.includes('coupons')}
              />
              <NavItem
                to="/standard-rates"
                icon={<CreditCard className="h-5 w-5" />}
                label="Standard Rates"
                isActive={location.pathname.includes('standard-rates')}
              />
              <NavItem
                to="/time-slots"
                icon={<Clock className="h-5 w-5" />}
                label="Time Slots"
                isActive={location.pathname.includes('time-slots')}
              />
            </NavGroup>
            
            <NavGroup label="System" icon={<Settings className="h-5 w-5" />}>
              <NavItem
                to="/smtp"
                icon={<Mail className="h-5 w-5" />}
                label="SMTP Settings"
                isActive={location.pathname.includes('smtp')}
              />
              <NavItem
                to="/pages"
                icon={<FileText className="h-5 w-5" />}
                label="Pages"
                isActive={location.pathname.includes('pages')}
              />
              <NavItem
                to="/payment-gateways"
                icon={<CreditCard className="h-5 w-5" />}
                label="Payment Gateways"
                isActive={location.pathname.includes('payment-gateways')}
              />
            </NavGroup>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AutoCareSidebar;
