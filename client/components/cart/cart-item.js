import React from 'react';
import QuantityAdjuster from './quantity-adjuster';

const CartItem = ({item}) => (
        <tr>
          <td>Image</td>
          <td>{item.product.name}</td>
          <td><QuantityAdjuster item={item} /></td>
          <td>${item.product.price * item.quantity}</td>
        </tr>
);

export default CartItem;
