'use client'
import React from 'react';
import { baseURL } from '@/util';
import { useRouter } from 'next/navigation'; 

export const ActionProvider = ({createChatBotMessage, createClientMessage, setState, children }) => {
  const router = useRouter();

  const addMessageToBotState = (messages, newState) => {
    setState((state) => ({
      ...state,
      newState,
      messages: [...state.messages, messages],
    }));
  };

  const handleResponse = (message, options) => {
    console.log('handleResponse', options);
    const messages = createChatBotMessage(message, {
      widget: 'options',
      payload: {options},
    });
    addMessageToBotState(messages);
  };

  const handleViewOrders = () => {
    router.push('/order');
  };

  const handleViewVehicles = (matches) => {

    const links = Object.keys(matches).map((key) => {
      return {
        title: key,
        url: `/vehicles/${matches[key]}`,
      }
    })

    const messages = createChatBotMessage("Please confirm the vehicle you want to view", {
      widget: 'redirects',
      payload: {links}
    });

    addMessageToBotState(messages, links);
  }
  

  const handleAddToCart = (matches) => {
      const base = baseURL();
      const calls = Object.keys(matches).map((key) => {
        return {
          title: key,
          url: `${base}/api/shoppingCart/${matches[key]}`,
          body: {option: 'add'}
        };
      });

      const messages = createChatBotMessage('Please confirm the vehicle you want to add.', {
        widget: 'api_calls',
        payload: {calls}
      });

      addMessageToBotState(messages, calls);
  };


  const handleCheckout = () => {
    router.push('/shoppingCart');
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleResponse,
            // handleUserChoice,
            handleViewOrders,
            handleViewVehicles,
            handleAddToCart,
            handleCheckout,
          },
        });
      })}
    </div>
  );
};

