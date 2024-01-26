import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App'
import React from 'react';

const root = ReactDOM.createRoot(document.querySelector('#root'))

/****
 * camera position
 * box: 
 * -3.431723242390655,
 * 12.798027537168215,
 * 6.469516796871723 
 * 
 * win screens:
 * 0,
 * 0,
 * 20
****/

root.render(
  <Canvas
    className='r3f'
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [ 
          -3.431723242390655,
          12.798027537168215,
          6.469516796871723 
      ],
    }}
  >
    <App />
  </Canvas>
)