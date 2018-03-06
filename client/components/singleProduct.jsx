import React from 'react';
import axios from 'axios';
import Review from './review';
import WriteReview from './write-review.js';
import {connect} from 'react-redux';
import {writeCartItemToStorage} from '../store';
import {Link} from 'react-router-dom';
import ProductEdit from './productEdit.jsx';

class ProductPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
            editing: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateProductReview = this.updateProductReview.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/products/${this.props.match.params.id}`)
             .then(product => {
                 return product.data;
             })
             .then(productData => this.setState({product: productData}));
    }

    handleClick() {
        this.props.addToCart(this.state.product);
    }

    updateProductReview(review) {
        const product = this.state.product;
        product.reviews = [...product.reviews, review];
        this.setState({product});
    }

    render() {
        const product = this.state.product;
        const photo = (product.photos) ? product.photos[0] : '';
        const price = product.price;
        const user = this.props.user;
        const isLoggedIn = !!user.id;
      
        return (
            <div>
                {
                    ( user.accountType === 'ADMIN' ) &&
                    ( this.state.editing
                    ? <button onClick={() => this.setState({editing: false})}>close</button>
                    : <button onClick={() => this.setState({editing: true})}>edit</button>)
                }
                {
                    ( this.state.editing ) && <ProductEdit product={product} />
                }
                <h1>{product.name}</h1>
                <div>
                    <img src={photo} />
                </div>
                <span>{price} USD </span>
                <span> {product.unit} </span>
                <Link to="/cart">
                    <button onClick={this.handleClick}>add to cart</button>
                </Link>
                <Review product={product} />
                { isLoggedIn &&
                    <WriteReview
                        product={product}
                        updateProductReview={this.updateProductReview} /> }
            </div>
        );
    }
}

const mapState = state => {
    return {
        user: state.user
    };
};

const mapDispatch = dispatch => {
    return {
        addToCart(product) {
            dispatch(writeCartItemToStorage(product, 1));
        }
    };
};

export default connect(mapState, mapDispatch)(ProductPage);
