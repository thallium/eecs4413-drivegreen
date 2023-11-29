"use client"; // This is a client component

import Link from "next/link";
import { baseURL } from "@/util";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import FiltVehicles from "../components/Vehicle/FiltVehicles";
import SortVehicles from "../components/Vehicle/SortVehicles";
import VehicleList from "../components/Vehicle/VehicleList";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function ListVehicles() {
  return (
    <QueryClientProvider client={queryClient}>
      <Vehicles />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  const {
    isPending: pendingVehicles,
    error: errorVehicle,
    data: vehiclesData,
  } = useQuery({
    queryKey: ["/api/vehicles"],
    queryFn: () =>
      axios.get(baseURL() + "/api/vehicles").then((res) => res.data),
  });

  const {
    isPending: pendingReviews,
    error: errorReviews,
    data: reviews,
  } = useQuery({
    queryKey: ["/api/review"],
    queryFn: () => axios.get(baseURL() + "/api/review").then((res) => res.data),
  });

  useEffect(() => {
    setVehicles(vehiclesData);
  }, [vehiclesData]);

  const filtBrand = (brand) => {
    setVehicles(
      vehiclesData.filter((vehicle) => {  // must use the raw data to filter
        if (!brand.includes("All")) return vehicle.brand === brand;
        else return true;
      })
    );
  };

  const filtShape = (shape) => {
    setVehicles(
      vehiclesData.filter((vehicle) => {  // must use the raw data to filter
        if (!shape.includes("All")) return vehicle.shape === shape;
        else return true;
      })
    );
  };
  
  const filtModelyear = (modelyear) => {
    setVehicles(
      vehiclesData.filter((vehicle) => {  // must use the raw data to filter
        if (!modelyear.includes("All")) return vehicle.modelYear.toString() === modelyear;
        else return true;
      })
    );
  };
  
  const filtHistory = (history) => {
    setVehicles(
      vehiclesData.filter((vehicle) => {  // must use the raw data to filter
        if (history.includes("Without")) return !vehicle.damaged;
        else if (history.includes("With")) return vehicle.damaged;
        else return true;
      })
    );
  };

  if (pendingVehicles || pendingReviews)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (errorVehicle || errorReviews)
    return (
      "An error has occurred: " +
      errorVehicle.message +
      ";" +
      errorReviews.message
    );

  return (
    <>
      <div className="flex m-2 justify-between">
        <SortVehicles />
        <FiltVehicles
          vehicles={vehiclesData}
          setBrand={(value) => filtBrand(value)}
          setShape={(value) => filtShape(value)}
          setModelyear={(value) => filtModelyear(value)}
          setHistory={(value) => filtHistory(value)}
        />
      </div>
      <div className="m-2">
        <VehicleList vehicles={vehicles} />
      </div>

      <h2>
        <Link
          href="/"
          style={{
            border: "1px solid #ccc",
            textAlign: "center",
            color: "red",
            margin: "4px",
          }}
        >
          Back to home
        </Link>
      </h2>
    </>
  );
}
