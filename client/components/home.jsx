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
        let products = ( this.props.category === 'ALL' ) ?
                       this.props.products.filter(product => {
                           return (product.name.toLowerCase().includes(this.state.search.toLowerCase()));
                       })
                     : this.props.products.filter(product => {
                             const match = product.categories.filter(category => {
                                 return category.id === this.props.category;
                             });
                             return ( match.length && product.name.toLowerCase().includes(this.state.search.toLowerCase()));
                         });
        return (
            <div>
                <form>
                    <label>
                        Search:
                        <input type="text" value={this.state.search} onChange={this.handleChange} />
                    </label>
                </form>
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
