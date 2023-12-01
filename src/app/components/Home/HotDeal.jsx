"use client";

import { baseURL } from "@/util";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import VehicleList from "../Vehicle/VehicleList";
import Link from "next/link";

const queryClient = new QueryClient();

export default function ListHotdeal() {
  return (
    <QueryClientProvider client={queryClient}>
      <Hotdeal />
    </QueryClientProvider>
  );
}

function Hotdeal() {
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
      errorReviews?.message
    );

    return (
      <>
        <div className="m-2">
          <VehicleList vehicles={vehiclesData.filter(vehicle => vehicle.hotDealed===true)} />
        </div>
      </>
    );
}
