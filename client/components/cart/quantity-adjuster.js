import React from 'react';
import {connect} from 'react-redux';
import {
  updateCartItemQuantityInStorage,
  removeCartItemFromStorage
} from '../../store';

const QuantityAdjuster = ({
  item,
  updateQuantity,
  removeItem
}) => {

  function handleMinusClick() {
    if (item.quantity > 1) { // Don't allow decreasing less than one
      updateQuantity(item.product, item.quantity - 1);
    }
  }

  function handlePlusClick() {
    updateQuantity(item.product, item.quantity + 1);
  }

  function handleXClick() {
    removeItem(item.product);
  }

  return (
    <span>
      <button onClick={handleMinusClick}>-</button>
      <span>{item.quantity}</span>
      <button onClick={handlePlusClick}>+</button>
      <button onClick={handleXClick}>x</button>
    </span>
  );
};


/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = {
  updateQuantity: updateCartItemQuantityInStorage,
  removeItem: removeCartItemFromStorage
};

export default connect(mapState, mapDispatch)(QuantityAdjuster);
