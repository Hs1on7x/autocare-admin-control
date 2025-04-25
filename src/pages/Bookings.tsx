
import React, { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, MapPin } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Booking {
  id: string;
  customerName: string;
  serviceType: string;
  date: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  vehicleType: string;
}

const mockBookings: Booking[] = [
  {
    id: 'b1',
    customerName: 'John Doe',
    serviceType: 'Oil Change',
    date: '2025-04-28',
    location: 'New York, NY',
    status: 'pending',
    vehicleType: 'Sedan',
  },
  {
    id: 'b2',
    customerName: 'Jane Smith',
    serviceType: 'Tire Rotation',
    date: '2025-04-29',
    location: 'Los Angeles, CA',
    status: 'confirmed',
    vehicleType: 'SUV',
  },
];

const getStatusColor = (status: Booking['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'confirmed':
      return 'bg-blue-500';
    case 'completed':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const Bookings = () => {
  const [bookings] = useState<Booking[]>(mockBookings);

  return (
    <div className="space-y-6">
      <AdminHeader title="Bookings" />
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>View and manage service bookings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {booking.customerName}
                  </TableCell>
                  <TableCell>{booking.serviceType}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {booking.date}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {booking.location}
                  </TableCell>
                  <TableCell>{booking.vehicleType}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
