import React from 'react';
import { connect } from 'react-redux';

import { setSelected } from '../../store/addresses';
import { addressViewableAttributes as attributes } from './helpers';

//gets address and editing toggle from props, gets address attributes from helpers, renders address attributes and edit button
//also allows user to select address

const AddressInfo = props => {

  return (
    <div>
      <ul>
        {attributes.map(attr => (
          <li key={attr.dbCol}>{props.address[attr.dbCol]}</li>
        ))}
      </ul>
      <button onClick={props.selectAddress}>select</button>
      <button onClick={props.edit}>edit</button>
    </div>
  );
};

const mapDispatch = (dispatch, OwnProps) => ({
  selectAddress: dispatch(setSelected(OwnProps.address.id)),
});

export default connect(null, mapDispatch)(AddressInfo);
