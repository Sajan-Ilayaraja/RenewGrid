import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  change?: number;
  changeType?: 'increase' | 'decrease';
}

export default function StatsCard({ title, value, icon, description, change, changeType }: StatsCardProps) {
  const isIncrease = changeType === 'increase';
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {change !== undefined && (
          <p className={`text-xs ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
            {isIncrease ? '+' : ''}{change.toFixed(1)}% from last period
          </p>
        )}
      </CardContent>
    </Card>
  );
}
