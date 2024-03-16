import { Text3D, useGLTF } from '@react-three/drei';
import React, { useRef, useState } from 'react';
import HtmlElement from './HtmlElement';
import YootButton from './YootButton';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import layout from './layout';
import { useAtom } from 'jotai';
import { tipsAtom } from './GlobalState';

export default function Tips() {
  // multiple components with conditional renders like pages
  const [page, setPage] = useState(0)
  const [_tips, setTips] = useAtom(tipsAtom)
  function onPointerEnter() {
    document.body.style.cursor = "pointer";
  }
  function onPointerLeave() {
    document.body.style.cursor = "default";
  }
  function onPrevClick() {
    setPage(page => page-1)
  }
  function onFinishClick() {
    setPage(0)
    setTips(false)
  }
  function onNextClick() {
    setPage(page => page+1)
  }
  function Tip({showPrevClick=true, showFinishClick=false, showNextClick=true, position=[0,0,0], text, width}) {
    return <group>
      <HtmlElement
        text={<div>
          <div>
            {text}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            { showPrevClick && <div 
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onClick={onPrevClick}
              style={{
                border: '1px solid limegreen',
                padding: '1px 5px',
                justifyContent: 'center'
              }}
            >
              prev
            </div>}
            { showNextClick && <div
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onClick={onNextClick}
              style={{
                border: '1px solid limegreen',
                padding: '1px 5px',
                justifyContent: 'center'
              }}
            >
              next
            </div>}
            { showFinishClick && <div
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onClick={onFinishClick}
              style={{
                border: '1px solid limegreen',
                padding: '1px 5px',
                justifyContent: 'center'
              }}
            >
              Finish
            </div>}
          </div>
        </div>}
        width={width}
        position={position}
        rotation={[-Math.PI/2, 0, 0]}
        backgroundColor='black'
        color='limegreen'
        border='1px solid limegreen'
        padding='5px 8px'
        whiteSpace='initial'
      />
    </group>
  }
  function YootButtonTip() {
    const nodes = useGLTF("models/yoot-highlight.glb").nodes;
    const materials = useGLTF("models/yoot-highlight.glb").materials;
    const nodesRhino = useGLTF("models/yoot-rhino-highlight.glb").nodes;
    const materialsRhino = useGLTF("models/yoot-rhino-highlight.glb").materials;
    const [yootButtonPressed, setYootButtonPressed] = useState(false)
    const NUM_YOOTS = 4;
    let yoots = [];
    for (let i = 0; i < NUM_YOOTS; i++) {
      yoots.push(useRef());
    }

    function handleYootButtonTipClick() {
      setYootButtonPressed(true)
      throwYoot()
    }
    function throwYoot() {
      for (let i = 0; i < 4; i++) {
        yoots[i].current.setLinvel({ x: 0, y: 0, z: 0 })
        yoots[i].current.setAngvel({ x: 0, y: 0, z: 0 })
        yoots[i].current.setTranslation({ x: -2 + 0.8*i, y: 1, z: -2});
        yoots[i].current.setRotation({ x: 0, y: 1, z: 0, w: 1 }, true);
        yoots[i].current.applyImpulse({
          x: 0,
          y: 2,
          z: 0,
        });
        yoots[i].current.applyTorqueImpulse({
          x: 0.95,
          y: 0.1,
          z: 0.03 + i * 0.05,
        });
      }
    }
    return <group name='yoot-set'>
      <group position={[5.8, 0, 3.5]}>
        <YootButton
          rotation={[0, Math.PI/2, 0]}
          active={!yootButtonPressed}
        />
        <mesh onPointerUp={handleYootButtonTipClick}>
          <boxGeometry args={[2, 0.5, 2.7]}/>
          <meshStandardMaterial color='grey' transparent opacity={0}/>
        </mesh>
      </group>
      <Physics>
        <RigidBody type="fixed">
          <CuboidCollider args={[20, 0.3, 20]} restitution={0.2} friction={1}/>
          <mesh>
            <boxGeometry args={[40, 0.6, 40]} />
            <meshStandardMaterial 
              transparent 
              color='yellow'
              opacity={0}
            />
          </mesh>
        </RigidBody>
        {yoots.map((ref, index) => {
          return (
            <RigidBody
              ref={ref}            
              position={[1.2 - index * 0.6, 1, 0]}
              rotation={[0, Math.PI/2, 0]}
              colliders="hull"
              restitution={0.3}
              friction={0.6}
              name={`yoot${index}`}
              linearDamping={0.3}
              angularDamping={0.1} // when this value is high, yoots spin more
              scale={0.3}
              gravityScale={2}
              key={index}
            >
              {index != 0 ? (
                <group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder011.geometry}
                    material={materials["Texture wrap.008"]}
                    position={[0, 0.021, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[1, 6.161, 1]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane.geometry}
                    material={nodes.Plane.material}
                    rotation={[-Math.PI, 0, 0]}
                    scale={[4.905, 1, 0.455]}
                  />
                </group>
              ) : (
                <group>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodesRhino.Cylinder007.geometry}
                    material={materialsRhino["Texture wrap.005"]}
                    position={[0, 0.022, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[1, 6.161, 1]}
                  />
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodesRhino.Plane001.geometry}
                    material={nodesRhino.Plane001.material}
                    rotation={[-Math.PI, 0, 0]}
                    scale={[4.892, 1, 0.443]}
                  />
                </group>
              )}
            </RigidBody>
          );
        })}
      </Physics>
    </group>
  }
  return <>
    { page == 0 && <Tip 
    showPrevClick={false} 
    position={[-4.5, 0, -3.4]} 
    text='Welcome to Yoot Game where two teams race their ships across the board!'
    width="190px"
    />}
    { page == 1 && <Tip 
    showPrevClick={true} 
    position={[-4.5, 0, -3.4]} 
    text='Click the "JOIN" button to choose a team.'
    width="150px"
    />}
    { page == 2 && <Tip 
    showPrevClick={true} 
    position={[0.4, 0, -1]} 
    text='These are your pieces.'
    width="150px"
    />}
    { page == 3 && <Tip 
    showPrevClick={true} 
    position={[3.5, 0, -3.5]} 
    text='You can move these across the stars and planets.'
    width="150px"
    />}
    { page == 4 && <Tip 
    showPrevClick={true} 
    position={[3.5, 0, -3.5]} 
    text='First, you need to get points by throwing the yoot (dice).'
    width="170px"
    />}
    { page == 5 && <group name='tip-5'>
      <Tip 
        showPrevClick={true} 
        position={[0.5, 0.5, 1.9]} 
        text='On your turn, the yoot button will appear. Click it to throw them.'
        width="150px"
      />
      <YootButtonTip/>
    </group>}
    { page == 6 && <Tip
    showPrevClick={true}
    position={[0.5, 0, 0.5]}
    text="depending on the roll, the move will show here."
    width="150px"
    />}
    { page == 7 && <Tip
    showPrevClick={true}
    position={[-7, 0, -1.5]}
    text="You can share the link to this game via 'invite'."
    width="150px"
    />}
    { page == 8 && <Tip
    showPrevClick={true}
    position={[-7, 0, -1.5]}
    text="Give us feedback or find new players on our Discord!"
    width="160px"
    />}
    { page == 9 && <Tip
    showPrevClick={true}
    showFinishClick={true}
    showNextClick={false}
    position={[0, 0, -3.5]}
    text="You can review the rules or change the settings here."
    width="160px"
    />}
  </>
}

useGLTF.preload("models/yoot-highlight.glb")
useGLTF.preload("models/yoot-rhino-highlight.glb")