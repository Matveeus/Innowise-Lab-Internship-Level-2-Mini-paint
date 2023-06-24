import React from 'react';
import image from '../../assets/images/stopper.png';

const NoArts = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
      <img
        src={image}
        alt="brush and paintings"
        style={{
          height: '100%',
          width: '350px',
        }}
      />
    </div>
  );
};

export default NoArts;
