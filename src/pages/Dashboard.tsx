
import React from 'react';
import AdminHeader from '@/components/AdminHeader';
import StatCard from '@/components/dashboard/StatCard';
import RecentBookings from '@/components/dashboard/RecentBookings';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import ServiceProviderMap from '@/components/dashboard/ServiceProviderMap';
import { Users, Calendar, Car, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <AdminHeader title="Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value="1,284"
          icon={<Calendar className="h-6 w-6 text-blue-700" />}
          iconBgColor="bg-blue-100"
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Active Users"
          value="856"
          icon={<Users className="h-6 w-6 text-purple-700" />}
          iconBgColor="bg-purple-100"
          change={{ value: "8%", positive: true }}
        />
        <StatCard
          title="Service Providers"
          value="103"
          icon={<Car className="h-6 w-6 text-green-700" />}
          iconBgColor="bg-green-100"
          change={{ value: "5%", positive: true }}
        />
        <StatCard
          title="Total Revenue"
          value="$28,947"
          icon={<CreditCard className="h-6 w-6 text-orange-700" />}
          iconBgColor="bg-orange-100"
          change={{ value: "3%", positive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceChart />
        <ServiceProviderMap />
      </div>
      
      <RecentBookings />
    </div>
  );
};

export default Dashboard;
