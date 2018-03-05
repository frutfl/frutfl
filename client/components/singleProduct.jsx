import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {writeCartItemToStorage} from '../store';
import {Link} from 'react-router-dom';

class ProductPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product: {},
            editing: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
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

    renderEdit(){
        return (
            <div>
                <h1>EDITING PANEL</h1>
            </div>
        );
    }

    render() {
        const product = this.state.product;
        const photo = (product.photos) ? product.photos[0] : '';
        const price = product.price;
        const user = this.props.user;
        return (
            <div>
                {
                    ( user.accountType === 'ADMIN' ) &&
                    (<button onClick={() => this.setState({editing: true})}>edit</button>)
                }
                {
                    ( this.state.editing ) && this.renderEdit()
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
