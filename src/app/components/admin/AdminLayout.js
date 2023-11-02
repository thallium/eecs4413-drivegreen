
import Sales from './Sales';
import LoginHistory from './LoginHistory';
import HotDealManage from './HotDealManage';


export default async function AdminLayout() {


  const res = await fetch(process.env.VERCEL_URL + '/api/admin', {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));

  return (
    <>
      {res && <h1>{res}</h1>}
      {/* {process.env.VERCEL_URL && <h1>VERCEL_URL: {process.env.VERCEL_URL}</h1>} */}
      <Sales res={res} />

      <LoginHistory />

      <HotDealManage />
    </>
  );
}
