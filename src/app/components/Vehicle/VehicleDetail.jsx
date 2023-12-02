import Image from "next/image";
import Link from "next/link";

function VehicleDetail({ vehicle }) {
  return (
    <div className="my-2">
      <div className="flex lg:flex-row justify-between p-2 gap-4">
        <div className="w-3/5 max-w-screen-lg flex">
          <Image
            src={`/vehicles/${vehicle.brand}.jpg`}
            width={1920}
            height={1080}
            alt="Vehicle"
            className="object-contain"
            priority
          />
        </div>
        <div className="overflow-x-auto w-2/5">
          <table className="table">
            <tbody className="">
              {/* row */}
              <tr className="">
                <th className="bg-base-200">Vehicle Name</th>
                <td className="">{vehicle.name}</td>
              </tr>
              {/* row */}
              <tr className="">
                <th className="bg-base-200">Description</th>
                <td className="">{vehicle.description || "Vehicle worth purchasing :)"}</td>
              </tr>
              {/* row */}
              <tr className="">
                <th className="bg-base-200">Manufacturer</th>
                <td className="">{vehicle.brand}</td>
              </tr>
              {/* row */}
              <tr className="">
                <th className="bg-base-200">Shape</th>
                <td className="">{vehicle.shape}</td>
              </tr>
              {/* row */}
              <tr className="">
                <th className="bg-base-200">Model year</th>
                <td className="">{vehicle.modelYear}</td>
              </tr>
              {/* row */}
              <tr className="">
                <th className="bg-base-200">History</th>
                <td className="">{vehicle.damaged ? "Damaged" : "No damage"}</td>
              </tr>
              {/* row */}
              <tr className="">
                <th className="bg-base-200">Mileage</th>
                <td className="">{vehicle.Mileage} km</td>
              </tr>
              {/* row */}
              <tr className="">
                <th className="bg-base-200">Stock</th>
                <td className="">{vehicle.quantity}</td>
              </tr>
              <tr className="">
                <th className="bg-base-200">Price</th>
                <td className="">${vehicle.price}</td>
              </tr>
              <tr className="">
                <th className="bg-base-200">Hot deal?</th>
                <td className="">{vehicle.hotDealed ? "Yes" : "No"}</td>
              </tr>
              <tr className="">
                <th className="bg-base-200">Average Rating</th>
                <td className="">{isNaN(vehicle.averageRating) ? "No ratings available" : vehicle.averageRating.toFixed(1) + " stars"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;
