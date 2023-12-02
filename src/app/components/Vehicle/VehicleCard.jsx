import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useNotification } from "../NotificationProvider";

function VehicleCard(props) {
  const [vehicle, setVehicle] = useState(props.vehicle);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useNotification();

  const addToShoppingCart = async (vid) => {
    const session = await getSession();
    if(!session){
      router.push('/signin');
      return;
    }
    try{
      setLoading(true);
      const response = await axios.put(`/api/shoppingCart/${vid}`, {"option": "add"});
      console.log("Added to shopping cart:", response.data);
      // Show success alert
      dispatch({
        type: "INFO",
        message: "Added to shopping cart successfully!"
      })
    } catch (error) {
      console.error("Error adding to shopping cart:", error);
      // Show error alert
      dispatch({
        type: "ERROR",
        message: `Error: ${error}.`
      })
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className="card w-96 h-[36rem] bg-base-100 shadow-xl">
      <figure>
        <Image
          src={`/vehicles/${vehicle.brand}.jpg`}
          alt="Vehicle"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        />
        {/* <img
          src="/vehicles/Audi.jpg"
          alt="Vehicle"
        /> */}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {vehicle.name}
          <div
            className={`badge badge-secondary ${
              vehicle.hotDealed ? "visible" : "invisible"
            }`}
          >
            Hot Deal
          </div>
        </h2>
        <h2 className="card-title">
          {`Today's Price: $${vehicle.price / 1000}k`}
        </h2>
        <p>{vehicle.description || "Vehicle worth purchasing :)"} </p>
        <div className="card-actions justify-end p-2">
          <div className="badge badge-outline">Brand: {vehicle.brand}</div>
          <div className="badge badge-outline">Shape: {vehicle.shape}</div>
          <div className="badge badge-outline">Model: {vehicle.modelYear}</div>
          <div className="badge badge-outline">
            {vehicle.quantity > 0 ? "In-stock" : "Out-of-stock"}
          </div>
          <div className="badge badge-outline">Mileage: {vehicle.Mileage} km</div>
          <div className="badge badge-outline">
            {vehicle.damaged ? "Like new" : "New"}
          </div>
        </div>
        <div className="card-actions justify-end">
          <button 
            className={`btn btn-primary ${loading? 'cursor-wait' : ''}`} 
            onClick={() => addToShoppingCart(vehicle.vid)} 
            disabled={loading}
          >
            {loading? "Adding to Shopping Cart":"Add to Cart"}
          </button>
          <Link href={`/vehicles/${vehicle.vid}`} className="btn btn-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
