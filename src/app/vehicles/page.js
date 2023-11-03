// "use client"; // This is a client component

import Link from 'next/link';

export default async function ListVehicles() {
  const getAPI = (process.env.NODE_ENV !== 'production'? process.env.LOCAL_URL : "https://" + process.env.VERCEL_URL) + "/api/vehicles";
  let vehicles = await fetch(getAPI, { cache: 'no-store' })
      .then(res=>res.json().then(data =>{ return data; }))
      .catch(err => console.log(err));

  return (
    <>
      <h1>{process.env.VERCEL_URL}</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 20,
        }}
      >
        {vehicles && vehicles.map((vehicle) => (
          <div
            key={vehicle.vid}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            {/* <Image
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
