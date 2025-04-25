
import React, { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash } from 'lucide-react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface VehicleType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

const mockVehicleTypes: VehicleType[] = [
  {
    id: 'vt1',
    name: 'Sedan',
    description: 'Standard 4-door passenger car',
    basePrice: 50,
  },
  {
    id: 'vt2',
    name: 'SUV',
    description: 'Sport Utility Vehicle',
    basePrice: 70,
  },
  {
    id: 'vt3',
    name: 'Truck',
    description: 'Light-duty pickup truck',
    basePrice: 85,
  },
];

const VehicleTypes = () => {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>(mockVehicleTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentVehicleType, setCurrentVehicleType] = useState<VehicleType | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newVehicleType = {
      id: currentVehicleType?.id || `vt${vehicleTypes.length + 1}`,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      basePrice: Number(formData.get('basePrice')),
    };

    if (currentVehicleType) {
      setVehicleTypes(vehicleTypes.map(vt => 
        vt.id === currentVehicleType.id ? newVehicleType : vt
      ));
    } else {
      setVehicleTypes([...vehicleTypes, newVehicleType]);
    }
    setIsDialogOpen(false);
    setCurrentVehicleType(null);
  };

  const handleEdit = (vehicleType: VehicleType) => {
    setCurrentVehicleType(vehicleType);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setVehicleTypes(vehicleTypes.filter(vt => vt.id !== id));
  };

  return (
    <div className="space-y-6">
      <AdminHeader title="Vehicle Types" />
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Vehicle Types</CardTitle>
              <CardDescription>Manage the types of vehicles that can be serviced</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setCurrentVehicleType(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vehicle Type
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleSave}>
                  <DialogHeader>
                    <DialogTitle>
                      {currentVehicleType ? 'Edit Vehicle Type' : 'Add Vehicle Type'}
                    </DialogTitle>
                    <DialogDescription>
                      Enter the details for the vehicle type.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={currentVehicleType?.name}
                        placeholder="Enter vehicle type name"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        defaultValue={currentVehicleType?.description}
                        placeholder="Enter description"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="basePrice">Base Price</Label>
                      <Input
                        id="basePrice"
                        name="basePrice"
                        type="number"
                        defaultValue={currentVehicleType?.basePrice}
                        placeholder="Enter base price"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicleTypes.map((vehicleType) => (
                <TableRow key={vehicleType.id}>
                  <TableCell>{vehicleType.name}</TableCell>
                  <TableCell>{vehicleType.description}</TableCell>
                  <TableCell>${vehicleType.basePrice}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(vehicleType)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(vehicleType.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
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

export default VehicleTypes;
