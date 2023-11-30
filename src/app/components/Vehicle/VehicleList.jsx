import VehicleCard from "./VehicleCard";

function VehicleList(props) {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-2 gap-4 justify-items-center">
      {props.vehicles.map((vehicle)=> (
        <div key={vehicle.vid}>
          <VehicleCard vehicle={vehicle} />
        </div>
      ))}
    </div>
  );
}

export default VehicleList;
