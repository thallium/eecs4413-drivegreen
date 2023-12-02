import React from 'react';
import { createChatBotMessage, createClientMessage } from 'react-chatbot-kit';
// import {baseURL} from "@/util.js"
import Options from '@/app/components/chatbot/widgets/Options';
import ApiCalls from '@/app/components/chatbot/widgets/ApiCall';
import Redirects from '@/app/components/chatbot/widgets/Redirect';

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

  },

  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "api_calls",
      widgetFunc: (props) => <ApiCalls {...props} />,
    },
    {
      widgetName: "redirects",
      widgetFunc: (props) => <Redirects {...props} />,
    }
  ]
};


export const validateInput = (input) => {
  if (input.trim().length < 1) 
    return false;

  return true;
}