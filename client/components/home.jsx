import React from 'react';
/* import ReactDOM from 'ReactDOM';*/
/* import { connect } from 'react-redux'*/
import Products from './products.jsx';
import {connect} from 'react-redux';
import {fetchAllProducts, writeCartItemToStorage} from '../store';
import Categories from './categories.jsx';

class Home extends React.Component {
    componentDidMount(){
        this.props.onLoad();
    }

    render() {
        const products = this.props.products;
        return(
            <div>
                <Categories />
                <Products products={products} />
            </div>
        );
    }
}

const mapState = state => {
    return {
        products: state.products
    };
};

const mapDispatch = dispatch => {
    // const product1 = {
    //     "name": "Braeburn Apples",
    //     "Category1": "Apples",
    //     "Category2": "test category",
    //     "species": "Apples",
    //     "variety": "Braeburn",
    //     "organic": "FALSE",
    //     "price": 1.24,
    //     "unit": "per pound",
    //     "inventory": 10,
    //     "isCurrentlyAvailable": "TRUE"
    //   };
    //   const product2 = {
    //     "name": "Limes",
    //     "Category1": "Citrus",
    //     "species": "Limes",
    //     "organic": "FALSE",
    //     "price": 0.3,
    //     "unit": "each",
    //     "inventory": 103,
    //     "isCurrentlyAvailable": "TRUE"
    //   };
    return {
        onLoad() {
            dispatch(fetchAllProducts());
            // dispatch(writeCartItemToStorage(product1, 1));
            // dispatch(writeCartItemToStorage(product2, 4));
        }
    };
};

export default connect(mapState, mapDispatch)(Home);
