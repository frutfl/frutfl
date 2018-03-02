import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addressViewableAttributes as attributes } from './helpers';

//gets address, editing toggle, and submit function from props, gets address attributes from helpers, renders form for editing or creating an address

class addressEntry extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.address;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit();
    this.props.stopEditing();
  }

  render() {
    return (
      <div>
        <ul>
          {attributes.map(attr => (
            <li key={attr.dbCol}>
              <label htmlFor={attr.dbCol}>{attr.label}</label>
              <input
                value={this.state[attr.dbCol] || ''}
                id={attr.dbCol}
                required={attr.required}
                onChange={this.handleChange}
                type={attr.type}
              />
            </li>
          ))}
        </ul>
        <button onClick={this.handleSubmit}>Save</button>
        <button onClick={this.props.stopEditing}>Cancel</button>
      </div>
    );
  }
}

export default addressEntry;
