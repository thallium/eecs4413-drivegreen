"use client"; // This is a client component

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Link from "next/link";

const queryClient = new QueryClient();

export default function PaymentSuccessPage({params}) {
    console.log(params);
    return (
      <QueryClientProvider client={queryClient}>
        <PaymentSuccess orderId={Number(params.oid)}/>
      </QueryClientProvider>
    );
  }

const fetchOrderDetails = async (oid) => {
  // Replace with your actual API call to fetch order details
  const response = await axios.get(`/api/order/${oid}`);
  return response.data;
};

const PaymentSuccess = ({orderId}) => {
  const router = useRouter();

  const { data:orderDetails, isLoading, isError } = useQuery({
    queryKey: ['/api/order', orderId], 
    queryFn: () => fetchOrderDetails(orderId)});

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
      );
  }

  if (isError) {
    return <p>Error loading order details.</p>;
  }

  return (
    <>
      {/* Payment Success Message */}
      <div className="container mx-auto my-8 text-center">
        <h2 className="text-3xl font-semibold text-green-500 mb-4">Payment Success!</h2>
      </div>

      {/* Order Details */}
      <div className="container mx-auto my-8">
        {orderDetails && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Order Details</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Order ID */}
              <div className="bg-white border border-gray-200 rounded-md p-4">
                <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderDetails.oid}</dd>
              </div>
              
              {/* Total Amount */}
              <div className="bg-white border border-gray-200 rounded-md p-4">
                <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                <dd className="mt-1 text-sm text-gray-900">${orderDetails.totalPrice.toFixed(2)}</dd>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 rounded-md p-4 col-span-2">
                <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderDetails.shippingAddr}</dd>
              </div>

              {/* Items in the Order */}
              <div className="bg-white border border-gray-200 rounded-md p-4 col-span-3">
                <dt className="text-sm font-medium text-gray-500">Items in the Order</dt>
                <ul className="mt-1 space-y-2">
                  {orderDetails.orderItems.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <img
                        src={`/vehicles/${item.vehicle.brand}.jpg`}
                        alt={item.vehicle.brand}
                        className="h-16 w-16 object-cover mr-4"
                      />
                      <div>
                        <h5 className="text-gray-700">{item.vehicle.name}</h5>
                        <p className="text-gray-700">{`Quantity: ${item.quantity}`}</p>
                        <p className="text-gray-700">{`Subtotal: $${item.subTotal.toFixed(2)}`}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </dl>
          </div>
        )}
      </div>

      {/* Back to Home Link */}
      <h2 className="text-center my-8">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </h2>
    </>

    
  );
};