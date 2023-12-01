'use client'
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const addMessageToBotState = (messages) => {
    setState((state) => ({
      ...state,
      messages: [...state.messages, messages],
    }));
  };

  const handleResponse = async (message) => {
    const messages = createChatBotMessage(message, { withAvatar: true });
    addMessageToBotState(messages);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleResponse,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
