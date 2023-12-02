
const ApiCalls = (props) => {
  console.log('calls', props.payload.calls);
  const call = async (url, body) => {
    // console.log('in call', url, body);
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      body: JSON.stringify(body),
    });

    if (res.ok) {
      //promt to user
      props.actions.handleResponse('OK, it is done');
    } else {
      //promt to user
      props.actions.handleResponse('Sorry, something went wrong');
    }
  };

  return (
    <>
      {props.payload.calls.map((c) => (
        <button key={c.title} onClick={() => call(c.url, c.body)}>
          {c.title}
        </button>
      ))}
    </>
  );
};

export default ApiCalls;
