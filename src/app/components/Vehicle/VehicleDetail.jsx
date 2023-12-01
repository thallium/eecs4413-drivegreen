import Image from "next/image";
import Link from "next/link";

function VehicleDetail({ vehicle }) {
  return (
    <div className="bg-base-200 my-2">
      <div className="flex lg:flex-row justify-between p-2 gap-4">
        <Image
          src={`/vehicles/${vehicle.brand}.jpg`}
          alt="Vehicle"
          width="0"
          height="0"
          sizes="100vw"
          className="w-3/5 h-auto"
        />
        <div className="overflow-x-auto w-2/5">
          <table className="table">
            <tbody className="">
              {/* row */}
              <tr className="hover:bg-teal-100 border-y-2 border-blue-300">
                <th className="bg-gray-300">Vehicle Name</th>
                <td className="">{vehicle.name}</td>
              </tr>
              {/* row */}
              <tr className="hover:bg-teal-100 border-y-2 border-blue-300">
                <th className="bg-gray-300">Description</th>
                <td className="">{vehicle.description || "Vehicle worth purchasing :)"}</td>
              </tr>
              {/* row */}
              <tr className="hover:bg-teal-100 border-y-2 border-blue-300">
                <th className="bg-gray-300">Manufacturer</th>
                <td className="">{vehicle.brand}</td>
              </tr>
              {/* row */}
              <tr className="hover:bg-teal-100 border-y-2 border-blue-300">
                <th className="bg-gray-300">Shape</th>
                <td className="">{vehicle.shape}</td>
              </tr>
              {/* row */}
              <tr className="hover:bg-teal-100 border-y-2 border-blue-300">
                <th className="bg-gray-300">Model year</th>
                <td className="">{vehicle.modelYear}</td>
              </tr>
              {/* row */}
              <tr className="hover:bg-teal-100 border-y-2 border-blue-300">
                <th className="bg-gray-300">History</th>
                <td className="">{vehicle.damaged ? "Damaged" : "No damage"}</td>
              </tr>
              {/* row */}
              <tr className="hover:bg-teal-100 border-y-2 border-blue-300">
                <th className="bg-gray-300">Mileage</th>
                <td className="">{vehicle.Mileage} km</td>
              </tr>
              {/* row */}
              <tr className="hover:bg-teal-100 border-y-2 border-blue-300">
                <th className="bg-gray-300">Stock</th>
                <td className="">{vehicle.quantity}</td>
              </tr>
              <tr className="hover:bg-teal-100 border-y-2 border-blue-300">
                <th className="bg-gray-300">Price</th>
                <td className="">${vehicle.price}</td>
              </tr>
              <tr className="hover:bg-teal-100 border-y-2 border-blue-300">
                <th className="bg-gray-300">Hot deal?</th>
                <td className="">{vehicle.hotDealed? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetail;
