import React from 'react';
// a dumb rendering component to be used in the Home, and Products views

export default function Product(props) {
    return (
        <div>
            <img src={props.image} />
        </div>
    );
}
