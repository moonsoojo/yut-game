import React from 'react';

export default function Interface() {
  return <div>
    <img 
      className="reset-camera-button" 
      src="images/camera.png" 
      style={{
        position: 'fixed',
        top: '6%',
        left: '90%',
        width: '45px',
        height: '35px',
      }}
    />
  </div>
}