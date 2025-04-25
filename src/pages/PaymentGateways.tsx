
import React from 'react';
import AdminHeader from '@/components/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const PaymentGateways = () => {
  return (
    <div className="space-y-6">
      <AdminHeader title="Payment Gateways" />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Offline Payment</CardTitle>
            <CardDescription>
              Configure offline payment settings for service providers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="offline-payment">Enable Offline Payment</Label>
                <p className="text-sm text-muted-foreground">
                  Allow service providers to request offline payments
                </p>
              </div>
              <Switch id="offline-payment" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-instructions">Payment Instructions</Label>
              <Textarea
                id="payment-instructions"
                placeholder="Enter instructions for offline payment processing..."
                className="min-h-[100px]"
                defaultValue="Service providers can request payment through the admin panel. Once approved, payment will be processed offline according to the agreed terms."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentGateways;
