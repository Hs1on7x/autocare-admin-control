
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const bookingStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

interface Booking {
  id: string;
  customer: string;
  service: string;
  date: string;
  amount: string;
  status: BookingStatus;
}

const mockBookings: Booking[] = [
  {
    id: 'B-1001',
    customer: 'John Doe',
    service: 'Oil Change',
    date: '2025-04-25',
    amount: '$49.99',
    status: 'pending',
  },
  {
    id: 'B-1002',
    customer: 'Jane Smith',
    service: 'Brake Service',
    date: '2025-04-24',
    amount: '$129.99',
    status: 'confirmed',
  },
  {
    id: 'B-1003',
    customer: 'Robert Johnson',
    service: 'Tire Rotation',
    date: '2025-04-24',
    amount: '$39.99',
    status: 'completed',
  },
  {
    id: 'B-1004',
    customer: 'Emily Brown',
    service: 'Engine Diagnostic',
    date: '2025-04-23',
    amount: '$89.99',
    status: 'cancelled',
  },
  {
    id: 'B-1005',
    customer: 'Michael Davis',
    service: 'Full Car Service',
    date: '2025-04-22',
    amount: '$299.99',
    status: 'completed',
  },
];

interface RecentBookingsProps {
  limit?: number;
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ limit = 5 }) => {
  const displayedBookings = mockBookings.slice(0, limit);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.customer}</TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={bookingStatusColors[booking.status]}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
