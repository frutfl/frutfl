import React from 'react';
import Product from './product.jsx';
// a dumb rendering component to be used in the Home, and Catagory views

export default function Products(props) {
    return (
        <div>
            {
                props.products.map(product => {
                    const key = product.id;
                    return <Product key={key} product={product} />;
                })
            }
        </div>
    );
}
