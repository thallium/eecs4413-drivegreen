"use client"; // This is a client component

import { useState } from 'react';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from "@tanstack/react-query";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/app/components/NotificationProvider';

const queryClient = new QueryClient();

export default function CheckOutPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckOutDetails />
    </QueryClientProvider>
  );
}

const fetchShoppingCart = async () => {
  const response = await axios.get('/api/shoppingCart'); 
  return response.data;
};

const createOrder = async (data) => {
  try {
    const response = await axios.post('/api/order', data); 
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create order: ${error}`);
  }
};

// Function to retrieve the click count from local storage
const getPayCount = () => {
  const storedCount = localStorage.getItem('payCount');
  return storedCount ? parseInt(storedCount, 10) : 0;
};

// Function to update and store the click count in local storage
const updatePayCount = (count) => {
  localStorage.setItem('payCount', count.toString());
};

const CheckOutDetails = () => {
  const { data: shoppingCart, isLoading, isError } = useQuery({
    queryKey: '/api/shoppingCart', 
    queryFn: fetchShoppingCart});
  const [shippingAddr, setShippingAddr] = useState('');
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [payCount, setPayCount] = useState(getPayCount());
  const router = useRouter();

  const handleShippingAddressChange = (e) => {
    setShippingAddr(e.target.value);
  };

  const handleCreditCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const dispatch = useNotification();

  const areAllFieldsFilled = () => {
    return shippingAddr.trim() !== '' &&
      creditCardInfo.cardNumber.trim() !== '' &&
      creditCardInfo.expirationDate.trim() !== '' &&
      creditCardInfo.cvv.trim() !== '';
  };

  const handlePlaceOrder = async () => {
    if(!areAllFieldsFilled()){
      dispatch({
        type: "ERROR",
        message: `All fields must be filled!`,
      })
      return;
    }
    
    setIsPlacingOrder(true);

    const newPayCount = payCount + 1;
    setPayCount(newPayCount);
    updatePayCount(newPayCount);

    let paymentSuccess = newPayCount % 3 !== 0;

    try {
      if(paymentSuccess){
        // Create an order
        const orderData = {
          shoppingCart,
          shippingAddr,
          paymentSuccess,
        };

        const createdOrder = await createOrder(orderData);

        // Redirect to order success page
        router.push(`/order/paymentSuccess/${createdOrder.oid}`);
      }
      else{
        dispatch({
          type: "ERROR",
          message: `Credit Card Authorization Failed!`,
        })
      }
      
    } catch (error) {
      console.error('Error placing order:', error);
      
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isLoading) {
    return (
        <div className="h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
  }

  if (isError) {
    return <p>Error loading shopping cart data.</p>;
  }

  return (
    <div className="container mx-auto px-20 my-8">
      <h2 className="text-3xl font-semibold mb-4">Check Out</h2>
      {/* Division line */}
      <hr className="my-6 border-t border-gray-300 mb-2" />

      {/* Display Shopping Cart Items*/}
      {shoppingCart && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Items</h3>
          {/* List displaying shopping cart items */}
          <ul className="grid grid-cols-1 gap-4">
            {shoppingCart.vehicleItems.map((item) => (
              <li key={item.vehicleId} className="bg-white border border-gray-200 rounded overflow-hidden shadow-md hover:shadow-lg transition flex flex-col">
                <div className='flex w-full'>
                  <img
                    src={`/vehicles/${item.vehicle.brand}.jpg`}
                    alt={item.vehicle.name}
                    className=" h-24 object-cover"
                  />
                  <div className="p-4 flex-grow">
                    <h5 className="text-gray-700">{item.vehicle.name}</h5>
                    <p className="text-gray-700">{`Quantity: ${item.quantity}`}</p>
                    <p className="text-gray-700">{`Subtotal: $${item.subTotal.toFixed(2)}`}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h4 className='text-lg font-semibold mb-2'>Total Price: ${shoppingCart.totalPrice.toFixed(2)}</h4>
        </div>
      )}
      <hr className="my-6 border-t border-gray-300 mb-2" />

      {/* Shipping Address Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Shipping</h3>
        <form>
          {/* Add input field for shipping address */}
          <div className="mb-4">
            <label htmlFor="shippingAddress" className="text-sm text-gray-600">Shipping Address: </label>
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              value={shippingAddr}
              onChange={handleShippingAddressChange}
              required
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        </form>
      </div>
      <hr className="my-6 border-t border-gray-300 mb-2" />

      {/* Credit Card Information Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Credit Card Information</h3>
        <form className="flex flex-col lg:flex-row">
          {/* Add input fields for credit card information */}
          <div className="mb-4 lg:mr-4 lg:w-1/2">
            <label htmlFor="cardNumber" className="text-sm text-gray-600">Card Number: </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={creditCardInfo.cardNumber}
              onChange={handleCreditCardInfoChange}
              required
              maxLength={16}
              className="border border-gray-300 p-3 rounded-md w-full max-w-[20ch] focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 lg:mr-4 lg:w-1/4">
            <label htmlFor="expirationDate" className="text-sm text-gray-600">Expiration Date: </label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={creditCardInfo.expirationDate}
              onChange={handleCreditCardInfoChange}
              required
              maxLength={5}
              className="border border-gray-300 p-3 rounded-md w-full max-w-[7ch] focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 lg:mr-4 lg:w-1/8">
            <label htmlFor="cvv" className="text-sm text-gray-600">CVV: </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={creditCardInfo.cvv}
              onChange={handleCreditCardInfoChange}
              required
              maxLength={3}
              className="border border-gray-300 p-3 rounded-md w-full max-w-[6ch] focus:outline-none focus:border-blue-500"
            />
          </div>
        </form>
      </div>

      {/* Place Order Button */}
      <div className="mt-6">
        <button
          className="btn btn-primary"
          onClick={handlePlaceOrder}
          disabled={!shoppingCart || isPlacingOrder}
        >
          {isPlacingOrder ? 'Processing...' : 'Place an Order'}
        </button>
      </div>
    </div>
  );
};