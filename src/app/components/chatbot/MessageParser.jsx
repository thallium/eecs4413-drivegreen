'use client'
import { baseURL } from '@/util.js';
import React, {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';

const MessageParser = ({ children, actions }) => {
  const [userEmail, setUserEmail] = useState('');
  const [tId, setTId] = useState('');
  const { data: session } = useSession({});
  const [vehicles, setVehicles] = useState([]);

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
    const data = await res.json();
    // console.log('res', res);
    // console.log('vehicles', data);
    let vehs = {};
    data.forEach((vehicle) => {
      vehs[vehicle.name] = vehicle.vid;
    });
    // console.log('vehs', vehs);
    setVehicles(vehs);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const parse = async (message) => {
    // console.log("baseURL: " + baseURL);
    let options = [];
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
      actions.handleResponse('Something went wrong.');
      return;
    }

    const { answer, thread_id } = await res.json();
    // console.log(await res.json());
    setTId(thread_id);
    let s = answer.replace(/\【[^]*source\】/g, '');
    
    if (session && message.includes('order')) {
      let op = {
        name: 'view orders',
        handler: actions.handleViewOrders
      }

      options.push(op);
    }

    let match = false;
    let matches = {}
    Object.keys(vehicles).forEach((key) => {
      if(s.includes(key)) {
        //todo: add widgets with vid
        match = true;
        matches[key] = vehicles[key];
      }
    });

    if(match) {
      let op1 = {
        name: 'view details',
        handler: () => actions.handleViewVehicles(matches)
      }
      options.push(op1);

      if (session) {
        let op2 = {
          name: 'add to cart',
          handler: () => actions.handleAddToCart(matches),
        };
        options.push(op2);
      }
    }

    actions.handleResponse(s, options);
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
