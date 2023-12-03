
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
      props.actions.handleResponse('Added to your shopping cart', [
      {
        name: 'go checkout',
        handler: props.actions.handleCheckout,
      }]);
    } else {
      //promt to user
      props.actions.handleResponse('Sorry, something went wrong');
    }
  };

  return (
    <div className="flex flex-wrap space-x-1">
      {props.payload.calls.map((c) => (
        <button
          key={c.title}
          onClick={() => call(c.url, c.body)}
          className="border-solid border-gray-200 rounded-xl border-2 px-2 mb-1"
        >
          {c.title}
        </button>
      ))}
    </div>
  );
};

export default ApiCalls;
