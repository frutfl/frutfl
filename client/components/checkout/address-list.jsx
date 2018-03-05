import React from 'react';

import AddressContainer from './address-container.jsx';

const AddressList = props => {

    return (
      <div>
        {props.addressList.map(address =>
          <AddressContainer key={address.id} address={address} selectAddress={props.selectAddress} selectedId={props.selectedId} />
        )}
      </div>
    );
};

export default AddressList;
