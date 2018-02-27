import React from 'React';
// a dumb rendering component to be used in the Home, and Products views

export default function Product(props) {
    return (
        <div>
            <image src={props.image} />
        </div>
    );
}
