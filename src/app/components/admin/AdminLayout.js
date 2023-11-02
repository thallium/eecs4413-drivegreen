
import Sales from './Sales';
import LoginHistory from './LoginHistory';
import HotDealManage from './HotDealManage';


export default async function AdminLayout() {

  const res = await fetch(process.env.VERCEL_URL + '/api/admin', {
    method: 'GET',
  });

  const data = await res.json();

  return (
    <>
      <h1>{data.message}</h1>
      <Sales />

      <LoginHistory />

      <HotDealManage />
    </>
  );
}
