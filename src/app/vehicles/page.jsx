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
import { useCallback, useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function ListVehicles() {
  return (
    <QueryClientProvider client={queryClient}>
      <Vehicles />
    </QueryClientProvider>
  );
}

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [priceSorter, setPriceSorter] = useState("Normal"); // 'Normal', 'Low to High', 'High to Low'
  const [mileageSorter, setMileageSorter] = useState("Normal"); // 'Normal', 'Short to Long', 'Long to Short'
  const [brandFilter, setBrandFilter] = useState("All");
  const [shapeFilter, setShapeFilter] = useState("All");
  const [modelFilter, setModelFilter] = useState("All");
  const [historyFilter, setHistoryFilter] = useState("All");

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
    data: reviewsData,
  } = useQuery({
    queryKey: ["/api/review"],
    queryFn: () => axios.get(baseURL() + "/api/review").then((res) => res.data),
  });

  const sortPrice = useCallback((data, priceSorter) => {
    return [...data].sort((a, b) => {
      // sort copied data
      if (priceSorter.toLowerCase().includes("low to high"))
        return a.price - b.price;
      else if (priceSorter.toLowerCase().includes("high to low"))
        return b.price - a.price;
      else return 0;
    });
  }, []);

  const sortMileage = useCallback((data, mileageSorter) => {
    return [...data].sort((a, b) => {
      // sort copied data
      if (mileageSorter.toLowerCase().includes("short to long"))
        return a.Mileage - b.Mileage;
      else if (mileageSorter.toLowerCase().includes("long to short"))
        return b.Mileage - a.Mileage;
      else return 0;
    });
  }, []);

  const filtBrand = useCallback((data, brandFilter) => {
    return data.filter((vehicle) => {
      if (!brandFilter.toLowerCase().includes("all"))
        return vehicle.brand === brandFilter;
      else return true;
    });
  }, []);

  const filtShape = useCallback((data, shapeFilter) => {
    return data.filter((vehicle) => {
      if (!shapeFilter.toLowerCase().includes("all"))
        return vehicle.shape === shapeFilter;
      else return true;
    });
  }, []);

  const filtModelyear = useCallback((data, modelyearFilter) => {
    return data.filter((vehicle) => {
      if (!modelyearFilter.toLowerCase().includes("all"))
        return vehicle.modelYear.toString() === modelyearFilter;
      else return true;
    });
  }, []);

  const filtHistory = useCallback((data, historyFilter) => {
    return data.filter((vehicle) => {
      if (historyFilter.toLowerCase().includes("without"))
        return !vehicle.damaged;
      else if (historyFilter.toLowerCase().includes("with"))
        return vehicle.damaged;
      else return true;
    });
  }, []);

  useEffect(() => {
    if (vehiclesData) {
      let result = vehiclesData;
      result = sortPrice(result, priceSorter);
      result = sortMileage(result, mileageSorter);
      result = filtBrand(result, brandFilter);
      result = filtShape(result, shapeFilter);
      result = filtModelyear(result, modelFilter);
      result = filtHistory(result, historyFilter);
      setVehicles(result);
      console.log("==setVehicles====");
    }
  }, [
    brandFilter,
    filtBrand,
    filtHistory,
    filtModelyear,
    filtShape,
    historyFilter,
    mileageSorter,
    modelFilter,
    priceSorter,
    shapeFilter,
    sortMileage,
    sortPrice,
    vehiclesData,
  ]);

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
        <SortVehicles
          setPrice={(value) => setPriceSorter(value)}
          setMileage={(value) => setMileageSorter(value)}
        />
        <FiltVehicles
          vehicles={vehiclesData}
          setBrand={(value) => setBrandFilter(value)}
          setShape={(value) => setShapeFilter(value)}
          setModelyear={(value) => setModelFilter(value)}
          setHistory={(value) => setHistoryFilter(value)}
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
