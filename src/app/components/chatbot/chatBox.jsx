'use client'
import Chatbot from 'react-chatbot-kit';
import './styles.css'
import { config, validateInput } from './config';
import MessageParser from '@/app/components/chatbot/MessageParser';
import ActionProvider from '@/app/components/chatbot/ActionProvider';
import {useState} from 'react';
import Icon from './icon'


export const ChatBox = () => {
    const [showChatbot, toggleChatbot] = useState(false);

    return (
      <div className="fixed right-0 bottom-0 z-50 m-3">
        <div className="flex absolute bottom-16 right-1">
          {showChatbot && (
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              headerText="Chat Bot"
              placeholderText="Type a message..."
              validator={validateInput}
            />
          )}
        </div>

        <button onClick={() => toggleChatbot((prev) => !prev)}>
          <Icon
            fill={'#327da8'}
            className="absolute right-1 bottom-1 w-10 h-10 p-1 border-solid border-2 border-[#327da8] rounded-full"
          />
        </button>
      </div>
    );
};