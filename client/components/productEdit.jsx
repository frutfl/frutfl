import React from 'react';
import axios from 'axios';

class ProductEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.product;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt){
        const kv = {};
        let val;
        switch (evt.target.name){
            case 'organic':
                val = evt.target.value === 'true';
                break;
            case 'isCurrentlyAvaialble':
                val = evt.target.value === 'true';
                break;
            default:
                val = evt.target.value;
        }
        kv[evt.target.name] = val;
        this.setState(kv);
    }

    handleSubmit(evt){
        evt.preventDefault();
        axios.put(`/api/products/${this.props.product.id}`, this.state)
        .then(response => console.log(response));
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Species:
                        <input type="text" value={this.state.species} name="species" onChange={this.handleChange} />
                    </label>
                    <label>
                        variety:
                        <input type="text" value={this.state.variety} name="variety" onChange={this.handleChange} />
                    </label>
                    <label>
                        organic:
                        <input type="text" value={this.state.organic.toString()} name="organic" onChange={this.handleChange} />
                    </label>
                    <label>
                        description:
                        <input type="text" value={this.state.description} name="description" onChange={this.handleChange} />
                    </label>
                    <label>
                        price:
                        <input type="number" value={this.state.price} name="price" onChange={this.handleChange} />
                    </label>
                    <label>
                        inventory:
                        <input type="number" value={this.state.inventory} name="inventory" onChange={this.handleChange} />
                    </label>
                    <label>
                        unit:
                        <input type="text" value={this.state.unit} name="unit" onChange={this.handleChange} />
                    </label>
                    <label>
                        isCurrentlyAvailable(t/F):
                                <>
                                    <input type="radio" name="isCurrentlyAvailable" value="true" onChange={this.handleChange} checked />
                                    <input type="radio" name="isCurrentlyAvailable" value="false" onChange={this.handleChange} />
                                </>
                    </label>
                    <label>
                        photos:
                        <input type="text" value={this.state.photos} name="photos" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default ProductEdit;
