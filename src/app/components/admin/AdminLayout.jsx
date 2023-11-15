
import {Sales} from '@/app/components/admin/Sales';
import {LoginHistory} from '@/app/components/admin/LoginHistory';
import {HotDealManage} from '@/app/components/admin/HotDeal';

import { isAdmin } from '@/app/backend/models/User';
import { getServerSession } from 'next-auth';
import { addHistory } from '@/app/backend/models/LoginHistory';



export default async function AdminLayout() {

  return <>
      <Sales />

      <LoginHistory />

      <HotDealManage />
  </>
}

