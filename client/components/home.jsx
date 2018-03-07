import React from 'react';
/* import ReactDOM from 'ReactDOM';*/
/* import { connect } from 'react-redux'*/
import Products from './products.jsx';
import {connect} from 'react-redux';
import {fetchAllProducts} from '../store';
import Categories from './categories.jsx';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.props.onLoad();
    }

    handleChange(evt){
        const search = evt.target.value;
        this.setState({ search });
    }

    render() {
        const regexp = new RegExp(`\\b${this.state.search}`, 'i');
        let products = ( this.props.category === 'ALL' ) ?
                       this.props.products.filter(product => {
                           return regexp.test(product.name);
                       })
                     : this.props.products.filter(product => {
                             const match = product.categories.filter(category => {
                                 return category.id === this.props.category;
                             });
                             return ( match.length && regexp.test( product.name ));
                         });
        return (
            <div>
                <Categories />
                <input className="search-box" type="text" value={this.state.search} placeholder="Search..." onChange={this.handleChange} />
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
