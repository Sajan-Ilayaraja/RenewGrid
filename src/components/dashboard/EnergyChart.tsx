'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { EnergyData } from '@/lib/data';

interface EnergyChartProps {
  data: EnergyData[];
}

const chartConfig = {
  generation: {
    label: 'Generation (kWh)',
    color: 'hsl(var(--chart-1))',
  },
  consumption: {
    label: 'Consumption (kWh)',
    color: 'hsl(var(--chart-2))',
  },
   storage: {
    label: 'Storage (%)',
    color: 'hsl(var(--chart-3))',
  },
};

export default function EnergyChart({ data }: EnergyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Overview</CardTitle>
        <CardDescription>Real-time generation, consumption, and storage levels.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80"
        >
          <AreaChart data={data} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} width={36} tick={{ fontSize: 10 }} />
            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="generation"
              type="natural"
              fill={chartConfig.generation.color}
              fillOpacity={0.4}
              stroke={chartConfig.generation.color}
              stackId="a"
            />
            <Area
              dataKey="consumption"
              type="natural"
              fill={chartConfig.consumption.color}
              fillOpacity={0.4}
              stroke={chartConfig.consumption.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
