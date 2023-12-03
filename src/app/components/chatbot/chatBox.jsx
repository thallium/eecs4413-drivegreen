'use client'
import Chatbot from 'react-chatbot-kit';
import '@/app/components/chatbot/styles.css';
import { config, validateInput } from '@/app/components/chatbot/config';
import {MessageParser} from '@/app/components/chatbot/MessageParser';
import {ActionProvider} from '@/app/components/chatbot/ActionProvider';
import {useState} from 'react';



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
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 119.35"
            fill={'#327da8'}
            className="absolute right-1 bottom-1 w-10 h-10 p-1 border-solid border-2 border-[#327da8] rounded-full bg-amber-50 m-2"
          >
            <path d="M57.49 29.2v-5.67a14.41 14.41 0 01-2-.93 12.18 12.18 0 01-5.05-15.1 12.39 12.39 0 012.64-3.95A12.21 12.21 0 0157 .92 12 12 0 0161.66 0a12.14 12.14 0 0111.22 7.5 12.14 12.14 0 010 9.27 12.08 12.08 0 01-2.64 3.94l-.06.06a12.74 12.74 0 01-2.36 1.83 11.26 11.26 0 01-2 .93v5.67H94.3a15.47 15.47 0 0115.42 15.43v2.29H115a7.93 7.93 0 017.9 7.91V73.2a7.93 7.93 0 01-7.9 7.91h-5.25v2.07A15.48 15.48 0 0194.3 98.61H55.23l-23.42 20.11a2.58 2.58 0 01-3.65-.29 2.63 2.63 0 01-.63-1.85l1.25-18h-.21a15.45 15.45 0 01-15.41-15.4v-2.07H7.91A7.93 7.93 0 010 73.2V54.83a7.93 7.93 0 017.9-7.91h5.26v-2.3A15.45 15.45 0 0128.57 29.2h28.92zm25.25 18.12a9.36 9.36 0 11-9.36 9.36 9.36 9.36 0 019.36-9.36zm-42.58 0a9.36 9.36 0 11-9.36 9.36 9.36 9.36 0 019.36-9.36zm6.38 31.36a2.28 2.28 0 01-.38-.38 2.18 2.18 0 01-.52-1.36 2.21 2.21 0 01.46-1.39 2.4 2.4 0 01.39-.39 3.22 3.22 0 013.88-.08A22.36 22.36 0 0056 78.32a14.86 14.86 0 005.47 1 16.18 16.18 0 005.53-1.1A25.39 25.39 0 0072.75 75a3.24 3.24 0 013.89.18 3 3 0 01.37.41 2.22 2.22 0 01.42 1.4 2.33 2.33 0 01-.58 1.35 2.29 2.29 0 01-.43.38 30.59 30.59 0 01-7.33 4 22.28 22.28 0 01-7.53 1.43A21.22 21.22 0 0154 82.87a27.78 27.78 0 01-7.41-4.16zM94.29 34.4H28.57a10.26 10.26 0 00-10.22 10.23v38.55a10.26 10.26 0 0010.22 10.23h3.17a2.61 2.61 0 012.41 2.77l-1 14.58 19.3-16.61a2.56 2.56 0 011.83-.75h40a10.26 10.26 0 0010.22-10.23V44.62A10.24 10.24 0 0094.29 34.4z" />
          </svg>
        </button>
      </div>
    );
};