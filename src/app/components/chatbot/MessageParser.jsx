'use client'
import { baseURL } from '@/util.js';
import React, {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';

const MessageParser = ({ children, actions }) => {
  const [userEmail, setUserEmail] = useState('');
  const [tId, setTId] = useState('');
  const { data: session } = useSession({});
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
    // Check if session and userEmail exist and update userEmail
    if (session && session.user && session.user.email) {
      setUserEmail(session.user.email);
      setTId('');
    }
  }, [session]); 

  const fetchVehicles = async () => {
    const res = await fetch(baseURL() + '/api/vehicles');
    if (!res.ok) {
      console.log('Failed to get vehicles!\nError: ' + (await res.text()));
      return;
    }
    const vehicles = await res.json();
    console.log(JSON.stringify(res));
    
    setVehicles(vehicles);
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  const parse = async (message) => {
    // check vehicle names
    // console.log("baseURL: " + baseURL);
    console.log("userEmail: " + userEmail + " tId: " + tId);
    const res = await fetch(baseURL() + '/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      body: JSON.stringify({ userInput: message, threadId: tId, userEmail }),
    });

    if (!res.ok) {
      console.log('Failed to get response!\nError: ' + (await res.text()));
      return;
    }

    const { answer, thread_id } = await res.json();
    // console.log(await res.json());
    setTId(thread_id);
    let s = answer.replace(/\【[^]*source\】/g, '');
    actions.handleResponse(s);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
