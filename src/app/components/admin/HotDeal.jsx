
import { getDeals} from "@/app/backend/models/Vehicle";
import {DeleteButton, AddDeal} from "./DealButtons";

// export const dynamic = 'force-dynamic';// force dynamic

export default async function HotDealManage() {
    const deals = await getDeals();
    // console.log(deals);
    return (
      <div className="overflow-x-auto max-h-96 border-solid border-2 rounded border-grey-400 relative">
        <table className="table">
          <caption className="">Hot Deals</caption>
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th>Brand</th>
              <th>Name</th>
              <th>Model</th>
              <th>Shape</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {deals &&
              deals.map((d) => (
                <tr key={d.vid}>
                  <td>{d.brand}</td>
                  <td>{d.name}</td>
                  <td>{d.modelYear}</td>
                  <td>{d.shape}</td>
                  <td>{d.price}</td>
                  <div className="m-2">
                    <DeleteButton vid={d.vid} />
                  </div>
                </tr>
              ))}
          </tbody>
        </table>
        <AddDeal />
      </div>
    );
}