import React from 'React';
/* import ReactDOM from 'ReactDOM';*/
/* import { connect } from 'react-redux'*/
import axios from 'axios';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            products: []
        };
    }

    componentDidMount(){
        axios.get('/api/products')
        .then(products => this.setState({products}));
    }

    render() {
        return(
            <div>
                <h1>
                    hello {this.state.products.length}
                </h1>
            </div>
        );
    }
}

