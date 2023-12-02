import React from 'react';
// import './Options.css';

const Options = (props) => {
  console.log('props', props);

  return (
    <div className="">
      <div className="flex flex-wrap">
        {props.payload.options &&
          props.payload.options.map((option) => (
            <button
              key={option.name}
              className="border-solid border-gray-200 rounded-2xl border-2 px-2"
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
