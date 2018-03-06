import React from 'react';
import { Link } from 'react-router-dom';
// a dumb rendering component to be used in the Home, and Products views

export default function Product(props) {
    const product = props.product;
    const name = product.name;
    const image = product.photos[0];
    const quantity = product.unit;
    const price = +product.price;
    return (
        <div className="product-listing">
            <Link to={`products/${product.id}`}>
                <img src={image} />
                <h4>{name} </h4>
                <p>${price.toFixed(2)} - {quantity}</p>
            </Link>
        </div>
    );
}
