
import React, { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  bookingId: string;
  customerName: string;
  amount: number;
  date: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
}

const mockOrders: Order[] = [
  {
    id: 'ord1',
    bookingId: 'b1',
    customerName: 'John Doe',
    amount: 150.00,
    date: '2025-04-28',
    paymentStatus: 'paid',
    paymentMethod: 'Cash',
  },
  {
    id: 'ord2',
    bookingId: 'b2',
    customerName: 'Jane Smith',
    amount: 200.00,
    date: '2025-04-29',
    paymentStatus: 'pending',
    paymentMethod: 'Offline Payment',
  },
];

const getPaymentStatusColor = (status: Order['paymentStatus']) => {
  switch (status) {
    case 'paid':
      return 'bg-green-500';
    case 'pending':
      return 'bg-yellow-500';
    case 'failed':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const Orders = () => {
  const [orders] = useState<Order[]>(mockOrders);

  return (
    <div className="space-y-6">
      <AdminHeader title="Orders" />
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>View and manage service orders</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.bookingId}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {order.date}
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
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

export default Orders;
