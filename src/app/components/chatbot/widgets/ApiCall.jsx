

const ApiCalls = ({calls, actions}) => {

    const call = async (url, body) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            body: JSON.stringify(body),
        });

        if(res.ok) {
            //promt to user
            actions.handleResponse('OK, it is done');
        }
        else {
            //promt to user
            actions.handleResponse('Sorry, something went wrong');
        }
    };

  return<>
    {calls.map((c) => { 
         <button key={c.title} onClick={() => call(c.url, c.body)}>
           {c.title}
         </button>;
     })}
  </>;
};

export default ApiCalls;
