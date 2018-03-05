import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
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
            <div>
                <button onClick={(evt) => this.onClick(evt, 'ALL')}>X</button>
                {categories.map(cat => (
                    <button key={cat.id} onClick={(evt) => this.onClick(evt, cat.id)}>{ cat.name }</button>
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
