
import Sales from '@/app/components/admin/Sales';
import LoginHistory from '@/app/components/admin/LoginHistory';
import HotDealManage from '@/app/components/admin/HotDeal';


export default async function AdminLayout() {

  return <>
      <Sales />

      <LoginHistory />

      <HotDealManage />
  </>
}

