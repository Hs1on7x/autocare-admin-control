
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceProviderMap: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Provider Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 bg-gray-100 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Map placeholder - Google Maps API integration</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-blue-50 p-2 rounded-md">
            <p className="text-xs text-gray-500">Active Providers</p>
            <p className="text-xl font-bold">24</p>
          </div>
          <div className="bg-green-50 p-2 rounded-md">
            <p className="text-xs text-gray-500">Avg. Response Time</p>
            <p className="text-xl font-bold">8m</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceProviderMap;
