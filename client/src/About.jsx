import React from 'react';
import Board from './Board';
import Rocket from './meshes/Rocket';
import Ufo from './meshes/Ufo';
import YootMesh from './meshes/YootMesh';
import { Float, Text3D } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import layout from './layout';
import YootRhino from './meshes/YootRhino';

export default function About(props) {
  function Rockets(props) {
    return <group {...props}>
      <group name='rocket-0'>
        <Rocket position={[-1,0,-0.7]} scale={2}/>
      </group>
      <group name='rocket-1'>
        <Rocket position={[0.5,0,-0.7]} scale={2}/>
      </group>
      <group name='rocket-2'>
        <Rocket position={[-1,0,0.9]} scale={2}/>
      </group>
      <group name='rocket-3'>
        <Rocket position={[0.5,0,0.9]} scale={2} />
      </group>
    </group>
  }

  function Ufos(props) {
    return <group {...props}>
      <group name='ufo-0'>
        <Ufo position={[-0.6,0,-0.7]} scale={2}/>
      </group>
      <group name='ufo-1'>
        <Ufo position={[0.8,0,-0.7]} scale={2}/>
      </group>
      <group name='ufo-2'>
        <Ufo position={[-0.6,0,0.9]} scale={2}/>
      </group>
      <group name='ufo-3'>
        <Ufo position={[0.8,0,0.9]} scale={2} />
      </group>
    </group>
  }
  function Yoots(props) {
    // on hover: flip yoot one by one
    // on hover out: flip yoot again

    const [springs0, api0] = useSpring(() => ({        
      from: {
        rotation: [0,0,0],
      }
    }))
    const [springs1, api1] = useSpring(() => ({        
      from: {
        rotation: [0,0,0],
      }
    }))
    const [springs2, api2] = useSpring(() => ({        
      from: {
        rotation: [0,0,0],
      }
    }))
    const [springs3, api3] = useSpring(() => ({        
      from: {
        rotation: [0,0,0],
      }
    }))

    function handlePointerEnter() {
      api0.start({ 
        from: {
          rotation: [0, 0, 0]
        },
        to: {
          rotation: [0, Math.PI, 0]
        },
      })
      api1.start({ 
        from: {
          rotation: [0, 0, 0]
        },
        to: {
          rotation: [0, Math.PI, 0]
        },
        delay: 100
      })
      api2.start({ 
        from: {
          rotation: [0, 0, 0]
        },
        to: {
          rotation: [0, Math.PI, 0]
        },
        delay: 200
      })
      api3.start({ 
        from: {
          rotation: [0, 0, 0]
        },
        to: {
          rotation: [0, Math.PI, 0]
        },
        delay: 300
      })
    }

    function handlePointerLeave() {
      api0.start({ 
        from: {
          rotation: [0, Math.PI, 0]
        },
        to: {
          rotation: [0, 0, 0]
        },
      })
      api1.start({ 
        from: {
          rotation: [0, Math.PI, 0]
        },
        to: {
          rotation: [0, 0, 0]
        },
        delay: 100
      })
      api2.start({ 
        from: {
          rotation: [0, Math.PI, 0]
        },
        to: {
          rotation: [0, 0, 0]
        },
        delay: 200
      })
      api3.start({ 
        from: {
          rotation: [0, Math.PI, 0]
        },
        to: {
          rotation: [0, 0, 0]
        },
        delay: 300
      })
    }

    return <group {...props}>
      <animated.group rotation={springs0.rotation} position={[0,0,0]}>
        <YootMesh scale={0.5}/>
      </animated.group>
      <animated.group rotation={springs1.rotation} position={[0,0,-1]}>
        <YootMesh scale={0.5}/>
      </animated.group>
      <animated.group rotation={springs2.rotation} position={[0,0,-2]}>
        <YootMesh scale={0.5}/>
      </animated.group>
      <animated.group rotation={springs3.rotation} position={[0,0,-3]}>
        <YootRhino rotation={[Math.PI, 0, 0]} scale={0.5}/>
      </animated.group>
      <mesh position={[0, 0, -1.5]} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
        <boxGeometry args={[2, 7, 5]}/>
        <meshStandardMaterial color='grey' transparent opacity={0}/>
      </mesh>
    </group>
  }

  return <group {...props}>
    <Text3D 
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[props.device].about.mainDescription.line0Position}
        size={layout[props.device].about.mainDescription.size}
        height={0.01}
    >
      {`Two teams throw the yoot (dice) to\nmove their pieces on the board. The\none that moves four pieces back to\nthe start first wins.`}
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    <group>
      <Text3D 
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[props.device].about.board.text.position}
        size={layout[props.device].about.board.text.size}
        height={0.01}
      >
        board
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Float rotationIntensity={0.001} speed={1} floatingRange={[0.01, 0.01]}>
        <Board 
        device={props.device} 
        position={layout[props.device].about.board.position} 
        rotation={layout[props.device].about.board.rotation} 
        scale={layout[props.device].about.board.scale} 
        interactive={false} 
        showStart={true}/>
      </Float>
      <Text3D 
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[props.device].about.pieces.position}
          size={layout[props.device].about.pieces.size}
          height={0.01}
      >
        pieces
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Float rotationIntensity={0.001} speed={3} floatingRange={[0.01, 0.01]}>
        <Rockets position={layout[props.device].about.pieces.rockets.position} rotation={[Math.PI/2, 0, 0]}/>
      </Float>
      <Float rotationIntensity={0.001} speed={3} floatingRange={[0.01, 0.01]}>
        <Ufos position={layout[props.device].about.pieces.ufos.position} rotation={[Math.PI/2, 0, 0]}/>
      </Float>
      <Text3D 
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[props.device].about.yoot.text.position}
        size={layout[props.device].about.yoot.text.size}
        height={0.01}
      >
        Yoot (dice)
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Float rotationIntensity={0.001} speed={1} floatingRange={[0.01, 0.01]}>
        <Yoots 
        position={layout[props.device].about.yoot.position} 
        rotation={[0, Math.PI/2, 0]} 
        scale={0.8}
        />
      </Float>
      <Text3D 
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[props.device].about.playersText.position}
          size={layout[props.device].about.playersText.size}
          height={0.01}
      >
        {`players:\n2 or more\nage: everyone`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  </group>
}