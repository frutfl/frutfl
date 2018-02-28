import React from 'react';
import {connect} from 'react-redux';
import {
  updateCartItemQuantityInStorage,
  removeCartItemFromStorage
} from '../../store';

const QuantityAdjuster = ({
  item,
  updateCartItemQuantityInStorage,
  removeCartItemFromStorage
}) => {

  function handleMinusClick(e) {
    if (item.quantity > 1) { // Don't allow decreasing less than one
      updateCartItemQuantityInStorage(item.product, item.quantity - 1);
    }
  }

  function handlePlusClick(e) {
    updateCartItemQuantityInStorage(item.product, item.quantity + 1);
  }

  function handleXClick(e) {
    removeCartItemFromStorage(item.product);
  }

  return (
    <span>
      <button onClick={handleMinusClick}>-</button>
      <span>{item.quantity}</span>
      <button onClick={handlePlusClick}>+</button>
      <button onClick={handleXClick}>x</button>
    </span>
  )
}


/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = {updateCartItemQuantityInStorage, removeCartItemFromStorage};

export default connect(mapState, mapDispatch)(QuantityAdjuster);
