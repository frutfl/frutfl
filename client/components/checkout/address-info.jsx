import React from 'react';
import { connect } from 'react-redux';

import { addressViewableAttributes as attributes } from './helpers';

//gets address and editing toggle from props, gets address attributes from helpers, renders address attributes and edit button
//also allows user to select address

const addressInfo = props => {

  return (
    <div>
      <ul>
        {attributes.map(attr => (
          <li key={attr.dbCol}>{props.address[attr.dbCol]}</li>
        ))}
      </ul>
      <button>select</button>
      <button onClick={props.edit}>edit</button>
    </div>
  );
};

const mapDispatch = dispatch => ({
  selectAddress: null
});

export default connect(null, mapDispatch)(addressInfo);
