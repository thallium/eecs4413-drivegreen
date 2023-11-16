
import {sale_reports } from '@/app/backend/service/admin/reports';


const getSales = async () => {
 
  const sales = await sale_reports();
  
  return sales;
};

export default async function Sales() {
  const sales = await getSales();
  
  return (
    <div className="overflow-x-auto max-h-48 overflow-y-scroll border-solid border-2 rounded border-grey-400">
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
