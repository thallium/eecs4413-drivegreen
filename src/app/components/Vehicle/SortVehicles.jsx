function SortVehicles({ setPrice, setMileage }) {
  return (
    <div className="flex items-center gap-4">
      <details className="dropdown">
        <summary className="m-1 btn bg-gray-300">Price</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li
            onClick={(e) => {
              setPrice(e.target.innerText);
            }}
          >
            <a>Normal</a>
          </li>
          <li
            onClick={(e) => {
              setPrice(e.target.innerText);
            }}
          >
            <a>Low to High</a>
          </li>
          <li
            onClick={(e) => {
              setPrice(e.target.innerText);
            }}
          >
            <a>High to Low</a>
          </li>
        </ul>
      </details>

      {/*  */}

      <details className="dropdown">
        <summary className="m-1 btn bg-gray-300">Mileage</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li
            onClick={(e) => {
              setMileage(e.target.innerText);
            }}
          >
            <a>Normal</a>
          </li>
          <li
            onClick={(e) => {
              setMileage(e.target.innerText);
            }}
          >
            <a>Short to Long</a>
          </li>
          <li
            onClick={(e) => {
              setMileage(e.target.innerText);
            }}
          >
            <a>Long to Short</a>
          </li>
        </ul>
      </details>
    </div>
  );
}

export default SortVehicles;
