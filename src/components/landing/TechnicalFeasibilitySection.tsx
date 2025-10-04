import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Server } from 'lucide-react';

export function TechnicalFeasibilitySection() {
  return (
    <section id="tech" className="container py-12 sm:py-24">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-primary">Technical Feasibility</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Built on a Foundation of Accessible Technology
        </p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Our solution is designed to be both powerful and cost-effective, leveraging proven, off-the-shelf hardware and a robust cloud infrastructure.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Cpu className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Affordable IoT Hardware</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We use widely available and low-cost components like Raspberry Pi and Arduino for data collection. This makes the system easy to deploy and maintain without requiring specialized, expensive equipment.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Server className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="mt-4">Scalable Cloud Backend</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Powered by Firebase and Google Cloud, our backend is built to scale. It handles data ingestion, storage, and analytics securely and efficiently, ensuring reliable performance as the network grows.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
