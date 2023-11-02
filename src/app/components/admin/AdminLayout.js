
import Sales from './Sales';
import LoginHistory from './LoginHistory';
import HotDealManage from './HotDealManage';


export default async function AdminLayout() {
  // console.log(process.env.VERCEL_URL, process.env.NODE_ENV);
  // const res = await fetch(process.env.LOCAL_URL + '/api/admin', {
  //   method: 'GET',
  // }).catch((err) => console.log(err));

  const res = await fetch(process.env.LOCAL_URL + '/api/admin', {
    method: 'GET',
  }).catch((err) => console.log(err));

  const data = () => {
    if (res) {return res.json()} else {console.log("cant connect local host"); return null}
  };

  return (
    <>
      <>{data}</>
      <Sales props={data} />

      <LoginHistory />

      <HotDealManage />
    </>
  );
}
