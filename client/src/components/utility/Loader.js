import React from 'react';
import spinner from '../../images/spinner.gif';

export default function Loader() {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt=""
      />
    </div>
  );
}
