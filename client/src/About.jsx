import React from 'react';
import HtmlElement from './HtmlElement';
import Tiles from './Tiles';
import Rocket from './meshes/Rocket';
import Ufo from './meshes/Ufo';
import Yoot from './meshes/Yoot';

export default function About(props) {

    function Rockets(props) {
        return <group {...props}>
          <group name='rocket-0'>
            <Rocket position={[-0.4,0,-0.7]} scale={1.5}/>
          </group>
          <group name='rocket-1'>
            <Rocket position={[0.8,0,-0.7]} scale={1.5}/>
          </group>
          <group name='rocket-2'>
            <Rocket position={[-0.4,0,0.5]} scale={1.5}/>
          </group>
          <group name='rocket-3'>
            <Rocket position={[0.8,0,0.5]} scale={1.5} />
          </group>
        </group>
      }
      function Ufos(props) {
        return <group {...props}>
          <group name='ufo-0'>
            <Ufo position={[-0.4,0,-0.7]} scale={1.5}/>
          </group>
          <group name='ufo-1'>
            <Ufo position={[0.8,0,-0.7]} scale={1.5}/>
          </group>
          <group name='ufo-2'>
            <Ufo position={[-0.4,0,0.5]} scale={1.5}/>
          </group>
          <group name='ufo-3'>
            <Ufo position={[0.8,0,0.5]} scale={1.5} />
          </group>
        </group>
      }

      function Yoots(props) {
        return <group {...props}>
            <Yoot scale={0.5} position={[0,0,0]}/>
            <Yoot scale={0.5} position={[0,0,-1]}/>
            <Yoot scale={0.5} position={[0,0,-2]}/>
            <Yoot scale={0.5} position={[0,0,-3]}/>
        </group>
      }

    return <group {...props}>
        <HtmlElement
            position={[0,0,0]}
            fontSize={26} 
            text='A board game played'
        />
        <HtmlElement
            position={[0,-0.7,0]}
            fontSize={26} 
            text='during the holidays in Korea.'
        />
        <group>
            <Tiles device={props.device} rotation={[Math.PI/2, 0, 0]} scale={0.5} position={[5, -5, 0]}/>
            <HtmlElement
                position={[-1,-4,-1]}
                fontSize={26} 
                text='Board'
            />
            <HtmlElement
                position={[-1,-10,-1]}
                fontSize={26} 
                text='Pieces'
            />
            <Rockets position={[3, -10, 0]} rotation={[Math.PI/4, 0, 0]}/>
            <Ufos position={[7, -10.5, 0]} rotation={[Math.PI/4, 0, 0]}/>
            <HtmlElement
                position={[10,-3,-1]}
                fontSize={26} 
                text='Yoot (Dice)'
            />
            <Yoots position={[13, -6, -2]} rotation={[Math.PI/2, Math.PI/2, 0]} scale={0.5}/>
            <HtmlElement
                position={[10,-9,-1]}
                fontSize={26} 
                text='Players: 2 or more'
            />
            <HtmlElement
                position={[10,-10,-1]}
                fontSize={26} 
                text='Age: Everyone'
            />
        </group>
    </group>
}