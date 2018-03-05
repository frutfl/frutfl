import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {writeCartItemToStorage} from '../store';

class ProductPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product: {}
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/products/${this.props.match.params.id}`)
             .then(product => {
                 return product.data;
             })
             .then(productData => this.setState({product: productData}));
    }

    handleClick(){
        this.props.addToCart(this.state.product);
    }

    render() {
        const product = this.state.product;
        const photo = (product.photos) ? product.photos[0] : '';
        const price = product.price;
        return (
            <div>
                <h1>{product.name}</h1>
                <div>
                    <img src={photo} />
                </div>
                <span>{price} USD </span>
                <span> {product.unit} </span>
                <button onClick={this.handleClick}>add to cart</button>
            </div>
        );
    }
}

const mapDispatch = dispatch => {
    return {
        addToCart(product) {
            dispatch(writeCartItemToStorage(product, 1));
        }
    };
};

export default connect(null, mapDispatch)(ProductPage);
