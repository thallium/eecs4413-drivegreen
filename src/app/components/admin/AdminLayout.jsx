
import Sales from '@/app/components/admin/Sales';
import LoginHistory from '@/app/components/admin/LoginHistory';
import HotDealManage from '@/app/components/admin/HotDeal';


export default async function AdminLayout() {

  return (
    <div className="mt-5 space-y-6">
      <Sales />

      <LoginHistory />

      <HotDealManage />
    </div>
  );
}

