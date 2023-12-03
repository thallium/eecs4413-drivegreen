import React from 'react';
// import './Options.css';

const Options = (props) => {
  console.log('props', props);

  return (
    <div className="">
      <div className="flex flex-wrap space-x-1">
        {props.payload.options &&
          props.payload.options.map((option) => (
            <button
              key={option.name}
              className="border-solid border-gray-200 rounded-xl border-2 px-1 mb-1"
              onClick={option.handler}
            >
              {option.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Options;
