import Link from 'next/link';
import { prisma } from './backend/db/dbClient';

export default async function Home() {
  let vehicles = await prisma.vehicle.findMany();
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Read <Link href="/viewRoute1/">this Route1 page!</Link>
        <br></br>
        Read <Link href="/viewRoute2/">this Route2 page!</Link>
      </div>

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
    </main>
  )
}
