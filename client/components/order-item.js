import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ item }) => (
  <div className="order-item">
    {item.product.photos &&
      <img src={item.product.photos[0]} />
    }
    <div>
      <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
      <div>Quantity: {item.quantity}</div>
      <div>${item.price * item.quantity}</div>
    </div>
  </div>
);

export default OrderItem;
