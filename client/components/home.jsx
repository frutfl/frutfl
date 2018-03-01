import React from 'react';
/* import ReactDOM from 'ReactDOM';*/
/* import { connect } from 'react-redux'*/
import Products from './products.jsx';
import {connect} from 'react-redux';
import {fetchAllProducts} from '../store';

class Home extends React.Component {
    componentDidMount(){
        this.props.onLoad();
    }

    render() {
        const products = this.props.products;
        return(
            <div>
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
    return {
        onLoad() {
            dispatch(fetchAllProducts());
        }
    };
};

export default connect(mapState, mapDispatch)(Home);
