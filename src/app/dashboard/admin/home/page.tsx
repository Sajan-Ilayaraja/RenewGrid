
'use client';

import AlertList from '@/components/dashboard/AlertList';
import EnergyChart from '@/components/dashboard/EnergyChart';
import StatsCard from '@/components/dashboard/StatsCard';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '@/lib/firebase';
import type { EnergyData, Alert, SystemStatus } from '@/lib/data';
import { energyData as sampleEnergyData, alerts as sampleAlerts, systemStatus as sampleSystemStatus } from '@/lib/data';
import { BatteryCharging, Flame, Sun, Wind, Zap, LogOut } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { AddUserDialog } from '@/components/dashboard/AddUserDialog';
import UserList from '@/components/dashboard/UserList';
import { Button } from '@/components/ui/button';

interface AdminDashboardClientPageProps {
  aiSummary: ReactNode;
}

export default function AdminDashboardClientPage({ aiSummary }: AdminDashboardClientPageProps) {
  const router = useRouter();
  const energyData = sampleEnergyData;
  const alerts = sampleAlerts;
  const systemStatus = sampleSystemStatus;

  const hasData = energyData && energyData.length > 0;
  const currentData = hasData ? energyData[energyData.length - 1] : { consumption: 0, solarGeneration: 0, windGeneration: 0, storage: 0, generation: 0 };
  const previousData = hasData && energyData.length > 1 ? energyData[energyData.length - 2] : null;

  const [solarEnabled, setSolarEnabled] = useState<boolean>(!!systemStatus?.solarGeneration);
  const [windEnabled, setWindEnabled] = useState<boolean>(false); // Always off

  const consumptionChange =
    previousData && previousData.consumption > 0
      ? ((currentData.consumption - previousData.consumption) / previousData.consumption) * 100
      : 0;
  
  const currentSolar = solarEnabled ? currentData.solarGeneration : 0;
  const prevSolar = previousData ? (solarEnabled ? previousData.solarGeneration : 0) : 0;
  const solarGenerationChange =
    previousData && prevSolar > 0
      ? ((currentSolar - prevSolar) / prevSolar) * 100
      : 0;

  const currentWind = windEnabled ? currentData.windGeneration : 0;
  const prevWind = previousData ? (windEnabled ? previousData.windGeneration : 0) : 0;
  const windGenerationChange =
    previousData && prevWind > 0
      ? ((currentWind - prevWind) / prevWind)
      : 0;
    
  const storageChange = previousData && currentData ? currentData.storage - previousData.storage : 0;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
            <AddUserDialog />
             <Button
               variant="outline"
               onClick={async () => {
                 try {
                   await getAuth(app).signOut();
                   router.push('/dashboard');
                 } catch (e) {
                   console.error('Logout failed', e);
                 }
               }}
             >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Solar Generation"
          value={`${currentSolar.toFixed(2)} kWh`}
          icon={<Sun className="h-4 w-4 text-muted-foreground" />}
          change={solarGenerationChange}
          changeType={solarGenerationChange >= 0 ? 'increase' : 'decrease'}
        />
        <StatsCard
          title="Wind Generation"
          value={`${currentWind.toFixed(2)} kWh`}
          icon={<Wind className="h-4 w-4 text-muted-foreground" />}
          change={windGenerationChange}
          changeType={windGenerationChange >= 0 ? 'increase' : 'decrease'}
        />
        <StatsCard
          title="Energy Consumption"
          value={`${currentData.consumption.toFixed(2)} kWh`}
          icon={<Flame className="h-4 w-4 text-muted-foreground" />}
          change={consumptionChange}
          changeType={consumptionChange >= 0 ? 'increase' : 'decrease'}
        />
        <StatsCard
          title="Battery Storage"
          value={`${currentData.storage.toFixed(2)}%`}
          icon={<BatteryCharging className="h-4 w-4 text-muted-foreground" />}
          change={storageChange}
          changeType={
            storageChange >= 0 ? 'increase' : 'decrease'
          }
        />
        <StatsCard
          title="Grid Status"
          value={systemStatus?.gridStatus || 'Offline'}
          icon={<Zap className="h-4 w-4 text-muted-foreground" />}
          description="All systems are operational."
        />
      </div>
       <div className="flex items-center space-x-4 pb-4">
            <div className="flex items-center space-x-2">
                <Switch id="solar-generation" checked={solarEnabled} onCheckedChange={setSolarEnabled} />
                <Label htmlFor="solar-generation">Solar Generation</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Switch id="wind-generation" checked={false} disabled />
                <Label htmlFor="wind-generation" className="text-muted-foreground">Wind Generation (Disabled)</Label>
            </div>
        </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="lg:col-span-4">
          {hasData ? <EnergyChart data={energyData} /> : <Skeleton className="h-[300px] w-full" />}
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-4">
            {alerts && alerts.length > 0 ? <AlertList alerts={alerts} /> : <Skeleton className="h-[200px] w-full" />}
            {aiSummary}
          </div>
        </div>
      </div>
      
      {/* User Management Section */}
      <div className="mt-6">
        <UserList />
      </div>
    </div>
  );
}
