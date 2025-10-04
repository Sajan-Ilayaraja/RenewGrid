import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="container flex h-[calc(100vh-10rem)] items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Live Demo Coming Soon
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          We are working hard to bring you a live interactive prototype of our monitoring system.
          <br />
          Check back soon to see it in action!
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
