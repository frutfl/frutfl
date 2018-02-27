import React from 'react';
/* import ReactDOM from 'ReactDOM';*/
/* import { connect } from 'react-redux'*/
import axios from 'axios';
import Products from './products.jsx'

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            products: []
        };
    }

    componentDidMount(){
        axios.get('/api/products')
             .then(products => {
                 /* console.log(products);*/
                 return products.data;
             })
             .then(productsData => this.setState({products: productsData}));
    }

    render() {
        console.log(this.state)
        const products = this.state.products;
        console.log(products)
        return(
            <div>
                <h1>
                    <Products products={products} />
                </h1>
            </div>
        );
    }
}

