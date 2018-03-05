import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import updateCategory from '../store';

class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount(){
        axios.get('/api/categories')
             .then(categoriesdat => categoriesdat.data)
        .then(categories => this.setState({categories}));
    }

    render(){
        const categories = this.state.categories;
        return (
            <div>
                {
                    categories.map(cat => (
                        <h1 key={cat.id}>{ cat.name }</h1>
                    ))
                }
            </div>
        );
    }
}

const mapDispatch = dispatch => {
    return {
        onClick(evt) {
            dispatch(updateCategory(evt.target));
        }
    };
};


export default connect(null, mapDispatch)(Categories);
