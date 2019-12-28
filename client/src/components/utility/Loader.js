import React from 'react';
import spinner from '../../images/spinner.gif';

export default function Loader() {
  return (
    <div style={{ width: '100%', margin: 'auto', display: 'block' }}>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt=""
      />
    </div>
  );
}
