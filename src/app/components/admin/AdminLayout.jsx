import { Suspense } from 'react';
import Sales from '@/app/components/admin/Sales';
import LoginHistory from '@/app/components/admin/LoginHistory';
import HotDealManage from '@/app/components/admin/HotDeal';

export default async function AdminLayout() {
  const fallback = <div>Loading...</div>;

  return (
    <main className="mt-5 space-y-6 p-8">
      <Suspense fallback={fallback}>
        <Sales />
      </Suspense>
      
      <Suspense fallback={fallback}>
        <LoginHistory />
      </Suspense>

      <Suspense fallback={fallback}>
        <HotDealManage />
      </Suspense>
    </main>
  );
}
