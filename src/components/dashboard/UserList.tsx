'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Phone, MapPin, Home, Zap } from 'lucide-react';
import type { UserDetails, Transaction } from '@/lib/data';

interface User {
  id: string;
  details: UserDetails;
  transactions: Transaction[];
  lastLogin?: string;
  status: 'Active' | 'Inactive';
}

// Sample user data - in a real app, this would come from your database
const sampleUsers: User[] = [
  {
    id: '1',
    details: {
      houseNumber: 'A-12',
      ownerName: 'Rajesh Kumar',
      address: 'A-12, First Street, Odisha',
      liveMeterReading: 123.45,
      phoneNumber: '+91 98765 43210'
    },
    transactions: [
      { id: 'TXN723847', date: '2024-06-28', amount: 75.50, status: 'Paid' },
      { id: 'TXN583291', date: '2024-05-28', amount: 82.10, status: 'Paid' },
    ],
    lastLogin: '2024-01-15 14:30',
    status: 'Active'
  },
  {
    id: '2',
    details: {
      houseNumber: 'B-42',
      ownerName: 'Priya Sharma',
      address: 'B-42, Second Street, Odisha',
      liveMeterReading: 45.67,
      phoneNumber: '+91 87654 32109'
    },
    transactions: [
      { id: 'TXN987654', date: '2024-06-25', amount: 55.00, status: 'Paid' },
      { id: 'TXN876543', date: '2024-05-25', amount: 60.25, status: 'Paid' },
    ],
    lastLogin: '2024-01-15 09:15',
    status: 'Active'
  },
  {
    id: '3',
    details: {
      houseNumber: 'C-78',
      ownerName: 'Amit Patel',
      address: 'C-78, Third Street, Odisha',
      liveMeterReading: 89.23,
      phoneNumber: '+91 76543 21098'
    },
    transactions: [
      { id: 'TXN654321', date: '2024-06-20', amount: 95.75, status: 'Pending' },
      { id: 'TXN543210', date: '2024-05-20', amount: 88.30, status: 'Paid' },
    ],
    lastLogin: '2024-01-14 16:45',
    status: 'Active'
  },
  {
    id: '4',
    details: {
      houseNumber: 'D-15',
      ownerName: 'Sunita Singh',
      address: 'D-15, Fourth Street, Odisha',
      liveMeterReading: 156.78,
      phoneNumber: '+91 65432 10987'
    },
    transactions: [
      { id: 'TXN432109', date: '2024-06-18', amount: 120.45, status: 'Paid' },
      { id: 'TXN321098', date: '2024-05-18', amount: 115.20, status: 'Paid' },
    ],
    lastLogin: '2024-01-10 11:20',
    status: 'Inactive'
  },
  {
    id: '5',
    details: {
      houseNumber: 'E-23',
      ownerName: 'Vikram Reddy',
      address: 'E-23, Fifth Street, Odisha',
      liveMeterReading: 98.34,
      phoneNumber: '+91 54321 09876'
    },
    transactions: [
      { id: 'TXN210987', date: '2024-06-22', amount: 78.90, status: 'Paid' },
      { id: 'TXN109876', date: '2024-05-22', amount: 85.40, status: 'Paid' },
    ],
    lastLogin: '2024-01-16 10:15',
    status: 'Active'
  },
  {
    id: '6',
    details: {
      houseNumber: 'F-67',
      ownerName: 'Kavita Gupta',
      address: 'F-67, Sixth Street, Odisha',
      liveMeterReading: 67.89,
      phoneNumber: '+91 43210 98765'
    },
    transactions: [
      { id: 'TXN098765', date: '2024-06-19', amount: 65.25, status: 'Paid' },
      { id: 'TXN987654', date: '2024-05-19', amount: 72.80, status: 'Paid' },
    ],
    lastLogin: '2024-01-12 15:30',
    status: 'Active'
  }
];

export default function UserList() {
  const totalUsers = sampleUsers.length;
  const activeUsers = sampleUsers.filter(user => user.status === 'Active').length;
  const totalConsumption = sampleUsers.reduce((sum, user) => sum + user.details.liveMeterReading, 0);

  const handleViewUser = (user: User) => {
    // Show user details in a modal or navigate to user detail page
    alert(`Viewing details for ${user.details.ownerName}\n\nHouse: ${user.details.houseNumber}\nAddress: ${user.details.address}\nPhone: ${user.details.phoneNumber}\nCurrent Reading: ${user.details.liveMeterReading} kWh\nStatus: ${user.status}\nLast Login: ${user.lastLogin || 'Never'}`);
  };

  const handleEditUser = (user: User) => {
    // Open edit dialog or navigate to edit page
    const newName = prompt(`Edit user name for ${user.details.houseNumber}:`, user.details.ownerName);
    if (newName && newName.trim() !== '') {
      alert(`User ${user.details.ownerName} has been updated to ${newName.trim()}`);
      // In a real app, you would update the database here
    }
  };

  const handleDeleteUser = (user: User) => {
    const confirmDelete = confirm(`Are you sure you want to delete user ${user.details.ownerName} (${user.details.houseNumber})?\n\nThis action cannot be undone.`);
    if (confirmDelete) {
      alert(`User ${user.details.ownerName} has been deleted successfully.`);
      // In a real app, you would remove the user from the database here
    }
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    const confirmToggle = confirm(`Are you sure you want to ${newStatus.toLowerCase()} user ${user.details.ownerName}?`);
    if (confirmToggle) {
      alert(`User ${user.details.ownerName} status has been changed to ${newStatus}.`);
      // In a real app, you would update the user status in the database here
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>
              Manage all registered users and their energy consumption
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {totalUsers} Total
            </Badge>
            <Badge variant="default" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {activeUsers} Active
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalConsumption.toFixed(1)} kWh</div>
              <div className="text-sm text-muted-foreground">Total Consumption</div>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">User Details</th>
                  <th className="text-left p-3 font-medium">House</th>
                  <th className="text-left p-3 font-medium">Consumption</th>
                  <th className="text-left p-3 font-medium">Last Bill</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-medium">{user.details.ownerName}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {user.details.phoneNumber}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {user.details.address}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        {user.details.houseNumber}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{user.details.liveMeterReading.toFixed(2)} kWh</div>
                      <div className="text-sm text-muted-foreground">Current reading</div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="font-medium">₹{user.transactions[0]?.amount.toFixed(2) || '0.00'}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.transactions[0]?.date || 'No bills'}
                        </div>
                        <Badge 
                          variant={user.transactions[0]?.status === 'Paid' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {user.transactions[0]?.status || 'N/A'}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant={user.status === 'Active' ? 'default' : 'secondary'}
                        className="flex items-center gap-1 w-fit cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleToggleStatus(user)}
                        title={`Click to ${user.status === 'Active' ? 'deactivate' : 'activate'} user`}
                      >
                        <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1 flex-wrap">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewUser(user)}
                          className="text-xs"
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          className="text-xs"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleStatus(user)}
                          className="text-xs"
                        >
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteUser(user)}
                          className="text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
