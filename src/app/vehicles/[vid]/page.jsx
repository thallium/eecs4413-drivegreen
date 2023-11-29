import { baseURL } from '@/util';
import Link from 'next/link';

// async function postVehicles({ params }) {
//   const patchAPI = (process.env.NODE_ENV !== 'production'? process.env.LOCAL_URL : "https://" + process.env.VERCEL_URL) + `/api/vehicles/${params.vid}`;

//   const res = await fetch('https://data.mongodb-api.com/...', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//     body: JSON.stringify({ time: new Date().toISOString() }),
//   })
// }

export default async function VehicleDetails({ params }) {
  const getAPI = baseURL() + `/api/vehicles/${params.vid}`;

  let vehicle = await fetch(getAPI, { cache: 'no-store' })
    .then(res => { return res.json(); })
    .catch(err => console.log(err));

  return (
    <>
      <h1>URL: {getAPI}</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {vehicle &&
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
        }
      </div>

      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
