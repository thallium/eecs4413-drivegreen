'use client'

import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import {config, ActionProvider, MessageParser} from './config';



export const ChatBox = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};