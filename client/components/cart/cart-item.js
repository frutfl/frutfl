import React from 'react';
import QuantityAdjuster from './quantity-adjuster';

const CartItem = ({item}) => (
        <tr>
          <td>Image</td>
          <td>{item.product.name}</td>
          <td><QuantityAdjuster item={item} /></td>
          <td>${(item.product.price * item.quantity).toFixed(2)}</td>
          <td>{item.product.unit}</td>
        </tr>
);

export default CartItem;
