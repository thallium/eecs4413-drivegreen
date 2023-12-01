import React from 'react';
import { createChatBotMessage, createClientMessage } from 'react-chatbot-kit';
import {baseURL} from "@/util.js"





export const config = {
  initialMessages: [createChatBotMessage(`Hi, I am Elon! How can I help you?`)],
  botName: 'Elon',

  customStyles: {
    botMessageBox: {
      backgroundColor: '#327da8',
    },
    chatButton: {
      backgroundColor: '#327da8',
    },
  },

  state: {
    threadId:"",
  },
};


export const validateInput = (input) => {
  if (input.length < 1) 
    return false;

  return true;
}