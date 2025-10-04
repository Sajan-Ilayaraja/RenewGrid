
// import { summarizeEnergyAnomalies } from '@/ai/flows/summarize-energy-anomalies'; // Disabled for static export
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function AiSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI-Powered Anomaly Summary
        </CardTitle>
        <CardDescription>
          AI analysis is currently unavailable in static mode.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          AI-powered analysis features are temporarily disabled. Please check back later or contact support for assistance.
        </p>
      </CardContent>
    </Card>
  );
}
