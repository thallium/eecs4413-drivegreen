'use client';
import { baseURL } from '@/util';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // APP router

export function DeleteButton({vid}) {
    const router = useRouter();

    const del = async() => {
      try {
        alert('Are you sure you want to delete this vehicle from hot deals?');
        const res = await fetch(baseURL() + '/api/admin/deal/' + vid, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "hotDealed": false }),
        });
        if(!res.ok) {
          alert('Delete failed!\nError: ' + await res.text());
          return;
        }
        router.refresh();
      } catch (err) {
        alert(err.message);
      };
      
    }
      
    
    return (
      <button className="btn btn-sm btn-circle btn-outline btn-error" onClick={del}>
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
        const res = await fetch(baseURL() + '/api/admin/deal/' + vid, {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({"hotDealed": true}),
        });
        if (!res.ok) {
          alert('Add failed!\nError: ' + (await res.text()));
          return;
        }
        setVid('');
        router.refresh();
      }
      catch(err) {
        alert(err.message);
      };
    };

    
    return (
      <div className="grid grid-cols-2 gap-4 w-1/5 m-2">
        <input
          type="text"
          placeholder="Vehicle ID"
          className="input input-bordered"
          value={vid}
          onChange={(e) => setVid(e.target.value)}
        />
        <button className="btn btn-outline btn-square btn-info" onClick={add}>
          add
        </button>
      </div>
    );
}