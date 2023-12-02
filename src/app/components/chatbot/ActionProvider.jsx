'use client'
import React from 'react';
import { redirect } from 'next/navigation';


const ActionProvider = ({createChatBotMessage, createClientMessage, setState, children }) => {
  const addMessageToBotState = (messages) => {
    setState((state) => ({
      ...state,
      messages: [...state.messages, messages],
    }));
  };

  const handleResponse = (message, options) => {
    const messages = createChatBotMessage(message, {
      widget: 'options',
      ...options,
    });
    addMessageToBotState(messages);
  };

  const handleUserChoice = (message) => {
    const messages = createClientMessage(message);
    addMessageToBotState(messages);
  }

  const handleViewOrders = () => {
    redirect('/orders');
  };

  const handleViewVehicles = (matches) => {
    if(Object.keys(matches).length == 1) {
      redirect(`/vehicles/${Object.values(matches)[0]}`);
    }
    else {
      const links = Object.keys(matches).map((key) => {
        return {
          title: key,
          url: `/vehicles/${matches[key]}`,
        }
      })

      const messages = createClientMessage("Which vehicle you want to view?", {
        widget: 'redirects',
        ...links,
      });

      addMessageToBotState(messages);
    }
  }

  const handleAddToCart = (matches) => {
      const calls = Object.keys(matches).map((key) => {
        return {
          title: key,
          url: `/api/shoppingCart/${matches[key]}`,
          body: {option: 'add'}
        };
      });

      const messages = createClientMessage('Please confirm the vehicle you want to add.', {
        widget: 'api_calls',
        ...calls,
      });

      addMessageToBotState(messages);
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
            handleAddToCart
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
