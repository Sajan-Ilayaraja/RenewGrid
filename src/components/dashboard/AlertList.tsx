import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import type { Alert } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface AlertListProps {
  alerts: Alert[];
}

const severityMap = {
  High: { icon: AlertTriangle, className: 'text-destructive' },
  Medium: { icon: Info, className: 'text-yellow-500' },
  Low: { icon: CheckCircle, className: 'text-green-500' },
};

export default function AlertList({ alerts }: AlertListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
        <CardDescription>Recent anomalies and system notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Severity</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => {
              const Icon = severityMap[alert.severity].icon;
              return (
                <TableRow key={alert.id}>
                  <TableCell>
                    <Badge variant={alert.severity === 'High' ? 'destructive' : 'secondary'}>
                      <div className="flex items-center gap-2">
                        <Icon className={cn("h-4 w-4", severityMap[alert.severity].className)} />
                        {alert.severity}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{alert.time}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
