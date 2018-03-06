import React from 'react';
import {Link} from 'react-router-dom';
// a dumb rendering component to be used in the Home, and Products views

export default function Product(props) {
    const product = props.product;
    const name = product.name;
    const image = product.photos[0];
    const quantity = product.unit;
    const price = +product.price;
    console.log(typeof price)
    return (
        <Link to={`products/${product.id}`}>
            <div>
                <h4>{name} </h4>
                <img src={image} />
                <h5>{price.toFixed(2)} USD {quantity}</h5>
            </div>
        </Link>
    );
}
