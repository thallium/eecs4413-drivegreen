'use client';
import { useState } from "react";
import { baseURL } from '@/util';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from 'next/link';

export default function ShoppingCart() {
    const session = useSession({
        required: true,
        onUnauthorized: () => {
            redirect('/signin')
        }
    })
    
    const [shoppingCart, setShoppingCart] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(baseURL() + "/api/shoppingCart", { cache: 'no-store' });
            if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const shoppingCartData = await response.json();
            console.log(shoppingCartData);
            setShoppingCart(shoppingCartData);
          } catch (error) {
            console.error('Error fetching shopping cart data:', error.message);
          }
    }

    fetchData();

      return (
        <>
          <h1>{process.env.VERCEL_URL}</h1>
          <div>
            <h1>Shopping Cart</h1>
            {shoppingCart && (
                <div> 
                <ol>
                    {shoppingCart.vehicleItems.map((item) => (
                    <li key={item.vehicleId}>
                        {item.vehicle.name}: (Quantity: {item.quantity} , Subtotal: {item.subTotal})
                    </li>
                    ))}
                </ol>
                <p>Total Price: {shoppingCart.totalPrice}</p>
                </div>
            )}
            </div>
                        
          <br></br> 
          <h2>
            Checkout
          </h2>
          <br></br>             
          <h2>
            <Link href="/">Back to home</Link>
          </h2>
        </>
      );
    }