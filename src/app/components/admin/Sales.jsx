
import {sale_reports } from '@/app/backend/service/admin/reports';


export default async function Sales() {
  const sales = await sale_reports();;
  // console.log("sales", sales.entries());
  return (
    <div className="overflow-x-auto max-h-56 border-solid border-2 rounded border-grey-400">
      <table className="table">
        <caption>Sales (last 1 month)</caption>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll">
          {sales &&
            Array.from(sales.entries()).map(([key, value]) => (
              // console.log(key, value),
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
