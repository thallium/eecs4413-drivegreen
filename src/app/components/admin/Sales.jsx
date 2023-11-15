
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
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Sold In Last Week</th>
            </tr>
          </thead>
          <tbody>
            {sales && Object.entries(sales).forEach(([key, value]) => (
                <tr>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
            ))
            }
          </tbody>
        </table>
      </div>
  );
}
