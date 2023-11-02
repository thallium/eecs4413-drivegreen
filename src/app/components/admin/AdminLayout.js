
import Sales from './Sales';
import LoginHistory from './LoginHistory';
import HotDealManage from './HotDealManage';


export default async function AdminLayout() {
  const url =
    process.env.NODE_ENV !== 'production'
      ? process.env.LOCAL_URL
      : 'https://' + process.env.VERCEL_URL;

  console.log('url: ' + url);
  const res = await fetch(url + '/api/admin', {
    method: 'GET',
  })
  .then((res) => res.json()
        .then((data) => {return data;})
  )
  .catch((err) => console.log(err));

  return (
    <>
      {res && <h1>{res.message + res.success}</h1>}
      {!res && <h1>why no response</h1>}
      {url && <h1>{url}</h1>}
      <Sales res={res} />

      <LoginHistory />

      <HotDealManage />
    </>
  );
}
