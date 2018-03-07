import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { updateCategory } from '../store';

class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categories: []
        };
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount(){
        axios.get('/api/categories')
             .then(categoriesdat => categoriesdat.data)
        .then(categories => this.setState({categories}));
    }

    onClick(evt, id){
        this.props.handleChange(id);
    }

    render(){
        const categories = this.state.categories;
        return (
            <div className="categories">
                <NavLink to="#" onClick={(evt) => this.onClick(evt, 'ALL')}>All</NavLink>
                {categories.map(cat => (
                    <NavLink to="#" key={cat.id} onClick={(evt) => this.onClick(evt, cat.id)}>{ cat.name }</NavLink>
                ))}
            </div>
        );
    }
}

const mapDispatch = dispatch => {
    return {
        handleChange(id){
            dispatch(updateCategory(id));
        }
    };
};
export default connect(null, mapDispatch)(Categories);
