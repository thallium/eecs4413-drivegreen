
import Sales from './Sales';
import LoginHistory from './LoginHistory';
import HotDealManage from './HotDealManage';



// export const getServerSideProps = async () => {
//   const data = "hello";
//     return {
//       props: data
//     }
// }



export default async function AdminLayout({data}) {

  return (
    <>
{/* 
      <Sales data={data} /> */}

      <LoginHistory />

      <HotDealManage />
    </>
  );
}

