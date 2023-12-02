"use client"; // This is a client component

import Link from "next/link";
import { baseURL } from "@/util";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ShoppingCartItemList from "../components/shoppingCart/ShoppingCartItemList"
import { getServerSession } from "next-auth"
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

export default function ShoppingCartPage() {
  const session = useSession({
    required: true,
    onUnauthorized: () => {
        redirect('/signin')
    }
  })

  const router = useRouter();

  const navigateToCheckOutDetail = () => {
    router.push('/checkout')
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ShoppingCart checkout={navigateToCheckOutDetail}/>
    </QueryClientProvider>
  );
}

function ShoppingCart(props) {
  const fetchShoppingCart = async () => {
    const response = await axios.get('/api/shoppingCart');
    return response.data;
  };
  
  const updateQuantity = async ({ vehicleId, option }) => {
    const response = await axios.put(`/api/shoppingCart/${vehicleId}`, { option });
    return response.data;
  };
  
  
  const {
    isFetching,
    isPending,
    error,
    data: shoppingCart,
    refetch,
  } = useQuery({
    queryKey:['/api/shopping-cart'], 
    queryFn: fetchShoppingCart
  });

  const [updating, setUpdating] = useState(false);

  const updateCart = async (vehicleId, option) => {
    try {
      // Set updating to true during the update
      setUpdating(true);
      // Perform the update
      await updateQuantity({ vehicleId, option });
      // Refetch shopping cart data after updating quantity
      refetch();
    } catch (error) {
      // Handle error if necessary
      console.error('Error updating quantity:', error);
    } finally {
      // Set updating to false after the update
      setUpdating(false);
    }
  };

  const increaseQuantity = (vehicleId) => {
    updateCart(vehicleId, 'add');
  };

  const decreaseQuantity = (vehicleId) => {
    updateCart(vehicleId, 'removeOne');
  };

  const removeItem = (vehicleId) => {
    updateCart(vehicleId, 'removeAll');
  };

  

  if (isFetching || isPending || updating) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
          
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="container mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      <ShoppingCartItemList
        items={shoppingCart.vehicleItems}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeItem} 
      />
      <div className="mt-4 flex justify-between">
        <p className="text-lg font-semibold">Total Price: ${shoppingCart.totalPrice.toFixed(2)}</p>
        <button className="btn w-64 rounded-full"
        onClick={props.checkout}>
          Checkout
        </button>
      </div>
    </div>
    <h2>
        <Link
          href="/"
          style={{
            border: "1px solid #ccc",
            textAlign: "center",
            color: "red",
            margin: "4px",
          }}
        >
          Back to home
        </Link>
    </h2>
    </>
    
  );
}

