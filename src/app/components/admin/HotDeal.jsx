
import { getDeals} from "@/app/backend/models/Vehicle";
import {DeleteButton, AddDeal} from "./DealButtons";

export default async function HotDealManage() {
    const deals = await getDeals();
    console.log(deals);
    return (
      <div className="overflow-x-auto max-h-56 border-solid border-2 rounded border-grey-400">
        <table className="table">
          <caption>Hot Deals</caption>
          <thead>
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
                  <DeleteButton vid={d.vid} />
                </tr>
              ))}
          </tbody>
        </table>
        <AddDeal />
      </div>
    );
}