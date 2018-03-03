import React from 'react';
import {Link} from 'react-router-dom';
// a dumb rendering component to be used in the Home, and Products views

export default function Product(props) {
    const product = props.product;
    const name = product.name;
    const image = product.photos[0];
    return (
        <Link to={`products/${product.id}`}>
            <div>
                <h4>{name}</h4>
                <img src={image} />
            </div>
        </Link>
    );
}
