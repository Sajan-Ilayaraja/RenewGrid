import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[500px] w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Solar panels in a field generating renewable energy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
      </div>
      <div className="container relative z-10 flex h-full items-center">
        <div className="max-w-2xl text-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Renewable Energy Monitoring System for Microgrids
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Real-time IoT Monitoring for Smarter Microgrids
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
            <Button asChild variant="link" size="lg">
              <Link href="#features">Learn more &rarr;</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
