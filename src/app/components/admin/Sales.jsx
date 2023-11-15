
import {sale_reports } from '@/app/backend/service/admin/reports';


export const getServerSideProps = async () => {
 
  const sales = await sale_reports();
  
  return {
    props: {
      sales: sales,
    },
  };
};

export default function Sales({sales}) {
  
  return (
    <div className="overflow-x-auto max-h-48 overflow-y-scroll">
      <table className="table">
        <caption>Sales (last week)</caption>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {sales &&
            Object.entries(sales).forEach(([key, value]) => (
              <tr>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
