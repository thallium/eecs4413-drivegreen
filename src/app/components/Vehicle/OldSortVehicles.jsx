function SortVehicles() {
  return (
    <div className="flex items-center gap-4">
      <button className="flex bg-gray-200 pl-2 rounded-full" onClick={() => {}}>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </div>
        <div>
          <span
            placeholder="Name"
            className="p-2 outline-none bg-transparent text-[0.8rem] text-gray"
          >
            Price  
          </span>
        </div>
      </button>
      
      
      {/*  */}


      <button className="flex bg-gray-200 pl-2 rounded-full" onClick={() => {}}>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </div>
        <div>
          <span
            placeholder="Name"
            className="p-2 outline-none bg-transparent text-[0.8rem] text-gray"
          >
            Milage  
          </span>
        </div>
      </button>
    </div>
  );
}

export default SortVehicles;
