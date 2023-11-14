"use client"; // This is a client component

import Link from 'next/link';
import { baseURL } from '@/util';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const queryClient = new QueryClient();

export default function ListVehicles() {
  return (
    <QueryClientProvider client={queryClient}>
      <Vehicles/>
    </QueryClientProvider>
  )
}

function Vehicles() {
  const { isPending, error, data } = useQuery({
    // queryKey: ['vehicles'],
    queryFn: () =>
      axios.get(baseURL() + '/api/vehicles').then(res => res.data)
  })
  // let vehicles = await fetch(baseURL() + "/api/vehicles", { cache: 'no-store' })
  //   .then(res => res.json().then(data => { return data; }))
  //   .catch(err => console.log(err));

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log('================')
  console.log(baseURL() + "/api/vehicles")
  console.log(data)

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
        {data && data.map((vehicle) => (
          <div
            key={vehicle.vid}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            {/* <Image
              src={`https://robohash.org/${vehicle.vid}?set=set2&size=180x180`}
              alt={vehicle.name}
              style={{ height: 180, width: 180 }}
            /> */}
              <h3 style={{color: 'blue'}}>Vehicle</h3>
              <h3>Name: {vehicle.name}</h3>
              <h3>Brand: {vehicle.brand}</h3>
              <h3>Shape: {vehicle.shape}</h3>
              <h3>ModelYear: {vehicle.modelYear}</h3>
              <h3>Hot deal? {JSON.stringify(vehicle.hotDealed)}</h3>
              <h3>Datetime: {JSON.stringify(vehicle.createdAt).split('.')[0]}</h3>
            </div>
          ))}
      </div>

      <h2>
        <Link href="/" style={{ border: "1px solid #ccc", textAlign: "center", color: "red"}}>Back to home</Link>
      </h2>
    </>
  );
}
