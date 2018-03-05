import React from 'react';
/* import ReactDOM from 'ReactDOM';*/
/* import { connect } from 'react-redux'*/
import Products from './products.jsx';
import {connect} from 'react-redux';
import {fetchAllProducts} from '../store';
import Categories from './categories.jsx';

class Home extends React.Component {
    componentDidMount(){
        this.props.onLoad();
    }

    render() {
        const products = ( this.props.category === 'ALL' ) ?
                         this.props.products :
                         this.props.products.filter(product => {
                             const match = product.categories.filter(category => {
                                 return category.id === this.props.category;
                             });
                             return match.length;
                         });
        return (
            <div>
                <Categories />
                <Products products={products} />
            </div>
        );
    }
}

const mapState = state => {
    return {
        products: state.products,
        category: state.category
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
