"use client"; // This is a client component

import Link from 'next/link';
import { baseURL } from '@/util';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation"

const queryClient = new QueryClient();

export default function ListOrders() {
  const session = useSession({
    required: true,
    onUnauthorized: () => {
        redirect('/signin')
    }
  })  
  return (
    <QueryClientProvider client={queryClient}>
      <Orders/>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

function Orders() {
  const { isPending: pendingOrders, error: errorOrder, data: orders } = useQuery({
    queryKey: ['/api/order'],
    queryFn: () =>
      axios.get(baseURL() + '/api/order').then(res => res.data)
  })

  if (pendingOrders) return 'Loading...';

  if (errorOrder) return 'An error has occurred: ' 
                                                + errorOrder.message;

  return (
    <>
      <h1>{process.env.VERCEL_URL}</h1>
      <div className="overflow-x-auto max-h-56 border-solid border-2 rounded border-grey-400">
          <table className="table">
          <caption> Order History </caption>
          <thead>
            <tr>
              <th>Time Created</th>
              <th>Ordered Items</th>
              <th>Shipping Address</th>
              <th>Total Price</th>
              <th>isPaid</th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {orders &&
              orders.map((order) => (
                //console.log(JSON.stringify(order))
                <tr key={order.oid}>
                  <td>{order.createdAt.toString()}</td>
                  <td>{
                    <ol>
                    {order.orderItems.map((item) => (
                    <li key={item.vehicleId}>
                        {item.vehicle.name}: (Quantity: {item.quantity} , Subtotal: {item.subTotal})
                    </li>
                    ))}
                    </ol>
                    }</td>
                  <td>{order.shippingAddr}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid.toString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <h2>
        <Link href="/" style={{ border: "1px solid #ccc", textAlign: "center", color: "red"}}>Back to home</Link>
      </h2>
    </>
  );
}