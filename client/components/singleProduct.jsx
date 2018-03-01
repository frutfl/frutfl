import React from 'react';
import axios from 'axios';

export default class ProductPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product: {}
        };
    }

    componentDidMount(){
        axios.get(`/api/products/${this.props.match.params.id}`)
             .then(product => {
                 return product.data;
             })
             .then(productData => this.setState({product: productData}));
    }

    render() {
        const product = this.state.product;
        const photo = (product.photos) ? product.photos[0] : '';
        const price = product.price;
        return(
            <div>
                <h1>{product.name}</h1>
                <div>
                    <img src={photo} />
                </div>
                <span>{price} USD </span>
                <span>{product.unit}</span>
            </div>
        );
    }
}
