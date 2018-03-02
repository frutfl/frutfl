import React from 'react';
import axios from 'axios';

export default class Categories extends React.Component {
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
        return(
            <div>
                {
                    categories.map(cat => (
                        <h1>{ cat.name }</h1>
                    ))
                }
            </div>
        );
    }
}
