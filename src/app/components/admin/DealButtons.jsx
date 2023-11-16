'use client';
import { baseURL } from '@/util';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // APP router

export function DeleteButton({vid}) {
    const router = useRouter();

    const del = async() => {
      try {
        alert('Are you sure you want to delete this vehicle from hot deals?');
        fetch(baseURL() + '/api/admin/deal/' + vid, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "hotDealed": false }),
        });
        router.refresh();
      } catch (err) {
        alert(err.message);
      };
      
    }
      
    
    return (
      <button 
      className="btn btn-square btn-outline"
      onClick={del}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    );
}


export function AddDeal() {
    const router = useRouter();
    const [vid, setVid] = useState('');
    const add = async() => {
      if(vid == '') 
        return alert('Please enter a vehicle ID');

      try {
        fetch(baseURL() + '/api/admin/deal/' + vid, {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({"hotDealed": true}),
        });
        setVid('');
        router.refresh();
      }
      catch(err) {
        alert(err.message);
      };
    };

    
    return (
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Vehicle ID"
          className="input input-bordered"
          value={vid}
          onChange={(e) => setVid(e.target.value)}
        />
        <button 
          className="btn btn-square btn-outline"
          onClick={add}
        >add
        </button>
      </div>
    );
}