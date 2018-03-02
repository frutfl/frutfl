import React from 'react';
import {Link} from 'react-router-dom';

const OrderItem = ({item}) => (
  <div>
    { item.product.photos &&
      <img src={item.product.photos[0]} />
    }
    <Link to={`/products/${item.product.id}`}>{ item.product.name }</Link>
    <div>{ item.quantity }</div>
    <div>${ item.price * item.quantity }</div>
  </div>
);

export default OrderItem;
