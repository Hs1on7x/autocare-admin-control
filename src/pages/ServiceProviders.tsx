
import React, { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter, MoreHorizontal, Plus, Search } from 'lucide-react';

interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  services: string[];
  rating: number;
  status: 'active' | 'inactive' | 'pending';
}

const mockServiceProviders: ServiceProvider[] = [
  {
    id: 'SP001',
    name: 'QuickFix Auto Care',
    email: 'contact@quickfixauto.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    services: ['Oil Change', 'Tire Rotation', 'Brake Service'],
    rating: 4.8,
    status: 'active',
  },
  {
    id: 'SP002',
    name: 'Elite Motors Service',
    email: 'service@elitemotors.com',
    phone: '(555) 987-6543',
    location: 'Los Angeles, CA',
    services: ['Engine Repair', 'Diagnostic', 'Full Service'],
    rating: 4.5,
    status: 'active',
  },
  {
    id: 'SP003',
    name: 'Fast Lane Mechanics',
    email: 'info@fastlanemech.com',
    phone: '(555) 456-7890',
    location: 'Seattle, WA',
    services: ['Tire Rotation', 'Alignment', 'Oil Change'],
    rating: 4.2,
    status: 'inactive',
  },
  {
    id: 'SP004',
    name: 'Urban Auto Workshop',
    email: 'service@urbanautows.com',
    phone: '(555) 789-0123',
    location: 'Austin, TX',
    services: ['Battery Replacement', 'Electrical Systems', 'Diagnostic'],
    rating: 4.6,
    status: 'active',
  },
  {
    id: 'SP005',
    name: 'Premium Car Care',
    email: 'contact@premiumcarcare.com',
    phone: '(555) 234-5678',
    location: 'Miami, FL',
    services: ['Oil Change', 'Full Service', 'Detailing'],
    rating: 4.9,
    status: 'pending',
  },
];

const statusStyles = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

const ServiceProviders: React.FC = () => {
  const { toast } = useToast();
  const [providers, setProviders] = useState<ServiceProvider[]>(mockServiceProviders);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setOpenViewDialog(true);
  };

  const handleEditProvider = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setOpenEditDialog(true);
  };

  const handleDeactivate = (provider: ServiceProvider) => {
    const updatedProviders = providers.map(p => {
      if (p.id === provider.id) {
        return { ...p, status: p.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' };
      }
      return p;
    });
    setProviders(updatedProviders);
    toast({
      title: "Status Updated",
      description: `${provider.name} has been ${provider.status === 'active' ? 'deactivated' : 'activated'}.`,
    });
  };

  const handleSaveEdit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedProvider) return;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const updatedProvider = {
      ...selectedProvider,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      services: (formData.get('services') as string).split(',').map(s => s.trim()),
    };

    const updatedProviders = providers.map(p =>
      p.id === selectedProvider.id ? updatedProvider : p
    );

    setProviders(updatedProviders);
    setOpenEditDialog(false);
    toast({
      title: "Provider Updated",
      description: "The service provider has been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <AdminHeader title="Service Providers" />
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Service Providers</CardTitle>
              <CardDescription>Manage service providers in your system</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search providers..."
                  className="pl-8 w-full sm:w-60"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Provider
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Service Provider</DialogTitle>
                    <DialogDescription>
                      Create a new service provider in the system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="name">Business Name</Label>
                        <Input id="name" placeholder="Enter business name" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter email" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Enter phone number" />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Enter location" />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="services">Services (comma separated)</Label>
                        <Input id="services" placeholder="e.g. Oil Change, Tire Rotation" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setOpenAddDialog(false)}>Save Provider</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="hidden md:table-cell">Services</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">
                    <div>
                      {provider.name}
                      <div className="text-sm text-gray-500">{provider.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{provider.location}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {provider.services.map((service) => (
                        <Badge key={service} variant="outline" className="bg-gray-100">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>⭐ {provider.rating}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={statusStyles[provider.status]}
                    >
                      {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewDetails(provider)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditProvider(provider)}>
                          Edit Provider
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Bookings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className={provider.status === 'active' ? 'text-red-600' : 'text-green-600'}
                          onClick={() => handleDeactivate(provider)}
                        >
                          {provider.status === 'active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Provider Details</DialogTitle>
            <DialogDescription>
              View detailed information about this service provider.
            </DialogDescription>
          </DialogHeader>
          {selectedProvider && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Name</Label>
                <div className="col-span-3">{selectedProvider.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Email</Label>
                <div className="col-span-3">{selectedProvider.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Phone</Label>
                <div className="col-span-3">{selectedProvider.phone}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Location</Label>
                <div className="col-span-3">{selectedProvider.location}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Services</Label>
                <div className="col-span-3 flex flex-wrap gap-1">
                  {selectedProvider.services.map(service => (
                    <Badge key={service} variant="outline" className="bg-gray-100">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Rating</Label>
                <div className="col-span-3">⭐ {selectedProvider.rating}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Status</Label>
                <div className="col-span-3">
                  <Badge 
                    variant="outline" 
                    className={statusStyles[selectedProvider.status]}
                  >
                    {selectedProvider.status.charAt(0).toUpperCase() + selectedProvider.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Provider Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Provider</DialogTitle>
            <DialogDescription>
              Make changes to the service provider's information.
            </DialogDescription>
          </DialogHeader>
          {selectedProvider && (
            <form onSubmit={handleSaveEdit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="name">Business Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      defaultValue={selectedProvider.name}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      defaultValue={selectedProvider.email}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      defaultValue={selectedProvider.phone}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      defaultValue={selectedProvider.location}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="services">Services (comma separated)</Label>
                    <Input 
                      id="services" 
                      name="services" 
                      defaultValue={selectedProvider.services.join(', ')}
                      required
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenEditDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceProviders;

