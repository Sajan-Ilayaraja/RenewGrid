
export type EnergyData = {
  time: string;
  generation: number;
  solarGeneration: number;
  windGeneration: number;
  consumption: number;
  storage: number;
};

export type Alert = {
  id: string;
  severity: 'High' | 'Medium' | 'Low';
  message: string;
  time: string;
};

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending';
};

export type UserDetails = {
    houseNumber: string;
    ownerName: string;
    address: string;
    liveMeterReading: number;
    phoneNumber?: string;
}

export type SystemStatus = {
    gridStatus: 'Online' | 'Offline';
    solarGeneration: boolean;
    windGeneration: boolean;
}

export const energyData: EnergyData[] = [
  { time: '00:00', generation: 1.2, solarGeneration: 0.2, windGeneration: 1.0, consumption: 5.5, storage: 85.0 },
  { time: '02:00', generation: 0.8, solarGeneration: 0.1, windGeneration: 0.7, consumption: 5.2, storage: 82.3 },
  { time: '04:00', generation: 0.5, solarGeneration: 0.1, windGeneration: 0.4, consumption: 5.0, storage: 79.1 },
  { time: '06:00', generation: 3.5, solarGeneration: 1.5, windGeneration: 2.0, consumption: 6.8, storage: 75.5 },
  { time: '08:00', generation: 15.2, solarGeneration: 10.0, windGeneration: 5.2, consumption: 8.5, storage: 80.1 },
  { time: '10:00', generation: 25.5, solarGeneration: 20.5, windGeneration: 5.0, consumption: 9.1, storage: 88.9 },
  { time: '12:00', generation: 30.1, solarGeneration: 28.1, windGeneration: 2.0, consumption: 10.2, storage: 95.3 },
  { time: '14:00', generation: 28.9, solarGeneration: 27.9, windGeneration: 1.0, consumption: 9.8, storage: 98.1 },
  { time: '16:00', generation: 22.3, solarGeneration: 20.3, windGeneration: 2.0, consumption: 8.9, storage: 96.2 },
  { time: '18:00', generation: 10.1, solarGeneration: 5.1, windGeneration: 5.0, consumption: 12.5, storage: 88.4 },
  { time: '20:00', generation: 2.5, solarGeneration: 0.5, windGeneration: 2.0, consumption: 11.1, storage: 80.6 },
  { time: '22:00', generation: 13.0, solarGeneration: 2.5, windGeneration: 10.5, consumption: 15.2, storage: 85.9 },
];

export const alerts: Alert[] = [
    { id: '1', severity: 'High', message: 'Unexpected drop in solar panel #3 output.', time: '2 min ago' },
    { id: '2', severity: 'Medium', message: 'Battery charge level below 20% threshold.', time: '15 min ago' },
    { id: '3', severity: 'Low', message: 'Grid consumption peak recorded at 6:05 PM.', time: '1 hour ago' },
];

export const anomalies: string[] = [
    "Sudden voltage spike at 14:05 on Turbine 2",
    "Solar panel #3 output dropped by 40% between 13:00 and 13:15",
    "Unusually high consumption recorded from residential block C at 18:00, exceeding forecasts by 25%",
];

export const userDetails: UserDetails = {
    houseNumber: 'A-12',
    ownerName: 'John Doe',
    address: '123, Maple Street, Evergreen, 12345',
    liveMeterReading: 123.45,
}

export const transactions: Transaction[] = [
    { id: 'TXN723847', date: '2024-06-28', amount: 75.50, status: 'Paid' },
    { id: 'TXN583291', date: '2024-05-28', amount: 82.10, status: 'Paid' },
    { id: 'TXN492103', date: '2024-04-28', amount: 68.90, status: 'Paid' },
    { id: 'TXN348392', date: '2024-03-28', amount: 71.20, status: 'Paid' },
]

export const systemStatus: SystemStatus = {
    gridStatus: 'Online',
    solarGeneration: true,
    windGeneration: true,
}

// Default data for new users
export const defaultUserDetails: UserDetails = {
    houseNumber: 'B-42',
    ownerName: 'Jane Smith (New User)',
    address: '456, Oak Avenue, Springfield, 67890',
    liveMeterReading: 45.67,
};

export const defaultTransactions: Transaction[] = [
    { id: 'TXN987654', date: '2024-06-25', amount: 55.00, status: 'Paid' },
    { id: 'TXN876543', date: '2024-05-25', amount: 60.25, status: 'Paid' },
];
