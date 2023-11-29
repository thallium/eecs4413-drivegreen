"use client";

import { Brand, Shape } from "@prisma/client";
import { useEffect, useState } from "react";

function FiltVehicles({ vehicles, setBrand, setShape, setModelyear, setHistory }) {
  const brandList = Object.keys(Brand);
  const shapeList = Object.keys(Shape);
  const [modelyearList, setModelyearList] = useState([]);

  useEffect(() => {
    if (vehicles) {
      let modelyearSet = new Set();
      vehicles.map((vehicle) => {
        modelyearSet.add(vehicle.modelYear);
      });
      setModelyearList(Array.from(modelyearSet));
    }
  }, [vehicles]);

  return (
    <div className="flex items-center gap-4">
      <select
        className="select select-bordered w-full max-w-xs border-2 border-blue-400 text-[0.8rem]"
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      >
        <option>All Brands</option>
        {brandList.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>

      <select
        className="select select-bordered w-full max-w-xs border-2 border-blue-400 text-[0.8rem]"
        onChange={(e) => {
          setShape(e.target.value);
        }}
      >
        <option>All Shapes</option>
        {shapeList.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>

      <select
        className="select select-bordered w-full max-w-xs border-2 border-blue-400 text-[0.8rem]"
        onChange={(e) => {
          setModelyear(e.target.value);
        }}
      >
        <option>All Models</option>
        {modelyearList.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>

      <select
        className="select select-bordered w-full max-w-xs border-2 border-blue-400 text-[0.8rem]"
        onChange={(e) => {
          setHistory(e.target.value);
        }}
      >
        <option>All Histories</option>
        <option>Without damage</option>
        <option>With damage</option>
      </select>
    </div>
  );
}

export default FiltVehicles;
