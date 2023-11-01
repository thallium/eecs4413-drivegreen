import Link from 'next/link';

let vehicles = await fetch(
  process.env.VERCEL_URL + '/api/vehicles',
  { cache: 'no-store' }
).then((res) =>
  res.json().then((data) => {
    return data;
  })
);

export default async function ListVehicles() {
  return (
    <>
      <h1>First Route</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.vid}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            {/* <img
              src={`https://robohash.org/${vehicle.vid}?set=set2&size=180x180`}
              alt={vehicle.name}
              style={{ height: 180, width: 180 }}
            /> */}
            <h3>{JSON.stringify(vehicle.createdAt)}</h3>
            <h3>{vehicle.name}</h3>
            <h3>{vehicle.brand}</h3>
            <h3>{vehicle.shape}</h3>
            <h3>{vehicle.modelYear}</h3>
            <h3>{JSON.stringify(vehicle.hotDealed)}</h3>
          </div>
        ))}
      </div>

      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}