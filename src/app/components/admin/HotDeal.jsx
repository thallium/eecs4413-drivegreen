import { getDeals} from "@/app/backend/models/Vehicle";
import {DeleteButton, AddDeal} from "./DealButtons";

export default async function HotDealManage() {
    const deals = await getDeals();

    return (
      <div className="">
        <table className="table overflow-x-auto max-h-48 overflow-y-scroll">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Name</th>
              <th>Model</th>
              <th>Shape</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
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