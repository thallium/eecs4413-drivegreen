"use client"; // This is a client component

import Link from 'next/link';
import { baseURL } from '@/util';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios';

const queryClient = new QueryClient();

export default function ListVehicles() {
  return (
    <QueryClientProvider client={queryClient}>
      <Vehicles/>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

function Vehicles() {
  const { isPending: pendingVehicles, error: errorVehicle, data: vehicles } = useQuery({
    queryKey: ['/api/vehicles'],
    queryFn: () =>
      axios.get(baseURL() + '/api/vehicles').then(res => res.data)
  })

  const { isPending: pendingReviews, error: errorReviews, data: reviews } = useQuery({
    queryKey: ['/api/review'],
    queryFn: () =>
      axios.get(baseURL() + '/api/review').then(res => res.data)
  })


  if (pendingVehicles || pendingReviews) return 'Loading...';

  if (errorVehicle || errorReviews) return 'An error has occurred: ' 
                                                + errorVehicle.message + errorReviews.message;

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
              <h3 style={{color: 'blue'}}>Vehicle id: {vehicle.vid}</h3>
              <h3>Name: {vehicle.name}</h3>
              <h3>Brand: {vehicle.brand}</h3>
              <h3>Shape: {vehicle.shape}</h3>
              <h3>ModelYear: {vehicle.modelYear}</h3>
              <h3>Damaged? {JSON.stringify(vehicle.damaged)}</h3>
              <h3>Mileage: {vehicle.Mileage}</h3>
              <h3>Quantities in-stock: {vehicle.quantity}</h3>
              <h3>Price: ${vehicle.price}</h3>
              <h3>Hot deal? {JSON.stringify(vehicle.hotDealed)}</h3>
              <h3>Latest in-stock: {JSON.stringify(vehicle.updatedAt).split(/[".]/)[1]}Z</h3>

              <h3>{reviews && reviews.filter(review => review.vehicleId === vehicle.vid).map(
                (review) => (
                  <div
                    key={review.id}
                    style={{ border: "1px solid #ccc", textAlign: "center" }}
                  >
                    <p>Review {review.id}: {review.title}</p>   
                  </div>
                ))}
              </h3>
            </div>
          ))}
      </div>

      <h2>
        <Link href="/" style={{ border: "1px solid #ccc", textAlign: "center", color: "red"}}>Back to home</Link>
      </h2>
    </>
  );
}
