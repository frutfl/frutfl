import React from 'react';

import { addressViewableAttributes as attributes } from './helpers';

const AddressInfo = props => {

  return (
    <div className={props.selectedId === props.address.id ? 'selected' : ''}>
      <ul>
        {attributes.map(attr => (
          <li key={attr.dbCol}>{props.address[attr.dbCol]}</li>
        ))}
      </ul>
      <button onClick={() => props.selectAddress(props.address.id)}>select</button>
      <button onClick={props.edit}>edit</button>
    </div>
  );
};

export default AddressInfo;
