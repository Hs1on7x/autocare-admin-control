
import React, { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Calendar } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface UserData {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  bookingsCount: number;
}

const mockUsers: UserData[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2025-01-15',
    status: 'active',
    bookingsCount: 5,
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    joinDate: '2025-02-20',
    status: 'active',
    bookingsCount: 3,
  },
];

const getUserStatusColor = (status: UserData['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    case 'inactive':
      return 'bg-yellow-500';
    case 'suspended':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const Users = () => {
  const [users] = useState<UserData[]>(mockUsers);

  return (
    <div className="space-y-6">
      <AdminHeader title="Users" />
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </div>
            <Button>
              <User className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {user.joinDate}
                  </TableCell>
                  <TableCell>{user.bookingsCount}</TableCell>
                  <TableCell>
                    <Badge className={getUserStatusColor(user.status)}>
                      {user.status}
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

export default Users;
