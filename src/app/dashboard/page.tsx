import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function DashboardLoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-start">
            <p className="flex-1 text-muted-foreground">
              Access the management dashboard to monitor grid status, control generation sources, and view system-wide analytics.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/admin/home">
                Admin Dashboard <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>User Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-start">
            <p className="flex-1 text-muted-foreground">
              View your household's energy consumption, pay bills, and interact with our support chatbot.
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/user/home">
                User Dashboard <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
