
'use server';

import AdminDashboardClientPage from './home/page';
import AiSummary from '@/components/dashboard/AiSummary';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function AdminDashboardPage() {
    return (
        <AdminDashboardClientPage 
            aiSummary={
                <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
                    <AiSummary />
                </Suspense>
            } 
        />
    );
}
