import React from 'react';
import ShoppingCartItem from './ShoppingCartItem';

const ShoppingCartItemList = ({ items, onIncrease, onDecrease, onRemove }) => {
  return (
    <div>
      {items.map((item) => (
        <ShoppingCartItem
          key={item.vehicle.vid}
          item={item}
          onIncrease={() => onIncrease(item.vehicle.vid)}
          onDecrease={() => onDecrease(item.vehicle.vid)}
          onRemove={() => onRemove(item.vehicle.vid)}
        />
      ))}
    </div>
  );
};

export default ShoppingCartItemList;