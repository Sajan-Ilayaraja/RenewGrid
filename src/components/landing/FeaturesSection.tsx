import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Cloud, Cpu, Smartphone, TrendingUp, Zap } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: <Activity className="h-8 w-8 text-primary" />,
    title: 'Real-time Monitoring',
    description: 'Track energy generation, consumption, and storage levels live from any device.',
  },
  {
    icon: <Cloud className="h-8 w-8 text-primary" />,
    title: 'Cloud-based Analytics',
    description: 'Leverage our cloud platform to analyze historical data and identify optimization opportunities.',
  },
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: 'Mobile App Integration',
    description: 'Stay connected and receive alerts on the go with our future mobile application integration.',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: '15% Efficiency Improvement',
    description: 'Our system is designed to boost microgrid efficiency, reducing waste and maximizing power availability.',
  },
  {
    icon: <Cpu className="h-8 w-8 text-primary" />,
    title: 'Low-cost IoT Sensors',
    description: 'Utilizing affordable hardware like Raspberry Pi and Arduino makes our solution accessible.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Smart Alerts',
    description: 'Receive instant notifications for system anomalies like low battery or efficiency drops.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="container py-12 sm:py-24">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">Core Features</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Everything you need for a smarter grid
        </p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Our platform is packed with features to enhance the performance and reliability of renewable energy microgrids.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
