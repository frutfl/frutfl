import React from 'React';
import Product from './product.jsx';
// a dumb rendering component to be used in the Home, and Catagory views

export default function Products(props) {
    return (
        <div>
            {
                props.products.map(product => {
                    const img = product.image;
                    const key = product.key;
                    return <Product key={key} image={img} />;
                })
            }
        </div>
    );
}
