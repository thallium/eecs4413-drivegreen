import React from 'react';

const ShoppingCartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const { vehicle, quantity, subTotal } = item;

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <img src={`/vehicles/${vehicle.brand}.jpg`} alt={vehicle.name} className="w-16 h-16 object-cover" />
        <div>
          <h3 className="text-lg font-semibold">{vehicle.name}</h3>
          <p className="text-gray-500">
            Brand: {vehicle.brand}, Shape: {vehicle.shape}, Model Year: {vehicle.modelYear}, Mileage: {vehicle.mileage}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={() => onDecrease(vehicle.id)} className="btn btn-secondary">
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button onClick={() => onIncrease(vehicle.id)} className="btn btn-secondary">
          +
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onRemove(vehicle.vid)}
        >
          Remove
        </button>
        <p className="ml-2">${subTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ShoppingCartItem;