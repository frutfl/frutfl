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
        console.log(product);
        return(
            <h1> this is an individual product's page </h1>
        );
    }
}
