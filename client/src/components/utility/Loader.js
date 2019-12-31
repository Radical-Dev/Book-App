import React from 'react';
import loading from '../../images/loading.gif';

export default function Loader() {
  return (
    <div style={{ width: '100%', margin: 'auto', display: 'block', marginTop:'5rem' }}>
      <img
        src={loading}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt=""
      />
    </div>
  );
}
