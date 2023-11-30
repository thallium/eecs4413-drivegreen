import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';



export const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};


export const config = {
  initialMessages: [createChatBotMessage(`Welcome to DriveGreen! How can I help you?`)],
};


export const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {},
        });
      })}
    </div>
  );
};
