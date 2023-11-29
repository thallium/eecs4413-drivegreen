import { Brand, Shape } from '@prisma/client'

function FiltVehicles() {
  const brandOptions = Object.keys(Brand);
  const shapeOptions = Object.keys(Shape);

  return (
    <div className="flex items-center gap-4">
      <select className="select select-bordered w-full max-w-xs border-2 border-blue-400 text-[0.8rem]">
        <option>All Brands</option>
        {brandOptions.map((option) => <option key={option}>{option}</option>)}
      </select>

      <select className="select select-bordered w-full max-w-xs border-2 border-blue-400 text-[0.8rem]">
        <option>
          All Shapes
        </option>
        {shapeOptions.map((option) => <option key={option}>{option}</option>)}
      </select>

      <select className="select select-bordered w-full max-w-xs border-2 border-blue-400 text-[0.8rem]">
        <option>
          All Models
        </option>
        <option>2000</option>
        <option>2005</option>
        <option>2010</option>
        <option>2015</option>
      </select>

      <select className="select select-bordered w-full max-w-xs border-2 border-blue-400 text-[0.8rem]">
        <option>
          All Histories
        </option>
        <option>Without damage</option>
        <option>With damage</option>
      </select>
    </div>
  );
}

export default FiltVehicles;
