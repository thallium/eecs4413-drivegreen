"use client";

import VehicleDetail from "@/app/components/Vehicle/VehicleDetail";
import { baseURL } from "@/util";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function ListVehiclesPage({params}) {
  console.log(params);
  return (
    <QueryClientProvider client={queryClient}>
      <VehicleSpecs vid={Number(params.vid)}/>
    </QueryClientProvider>
  );
}

function VehicleSpecs({vid}) {
  const [vehicle, setVehicle] = useState();
  
  const {
    isLoading: pendingVehicle,
    error: errorVehicle,
    data: vehicleData,
  } = useQuery({
    queryKey: ["/api/vehicles", vid],
    queryFn: () =>
      axios.get(baseURL() + "/api/vehicles/" + vid).then((res) => res.data),
    retryDelay: 1000,
    enabled: !!vid,
  });

  const {
    isLoading: pendingReviews,
    error: errorReviews,
    data: reviewsData,
  } = useQuery({
    queryKey: ["/api/review"],
    queryFn: () => axios.get(baseURL() + "/api/review").then((res) => res.data),
    retryDelay: 1000,
    enabled: !!vid,
  });

  useEffect(() => {
    setVehicle(vehicleData);
  }, [vehicleData])
  

  if (pendingVehicle || pendingReviews)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (errorVehicle)
    return (
      "An error has occurred: " +
      errorVehicle.message
    );

  if (errorReviews)
    return (
      "An error has occurred: " +
      errorReviews.message
    );

  return (
    <>
      {vehicle && <VehicleDetail vehicle={vehicle}/>}

      <h2>
        <Link
          href="/vehicles"
          style={{
            border: "1px solid #ccc",
            textAlign: "center",
            color: "red",
            margin: "4px",
          }}
        >
          Back
        </Link>
      </h2>
    </>
  );
}
