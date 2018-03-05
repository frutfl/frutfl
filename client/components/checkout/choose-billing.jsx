import React from 'react';

const ChooseBilling = ({ choose }) => (
  <div>
    <h3>Use selected shipping address as billing address?</h3>
    <button onClick={() => choose(true)}>yes</button>
    <button onClick={() => choose(false)}>no</button>
  </div>
);

export default ChooseBilling;
