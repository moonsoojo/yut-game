import React from 'react';
import { useAtom } from 'jotai';
import { animationPlayingAtom, deviceAtom, mainAlertAtom } from './GlobalState';
import CatchAlert from './alerts/CatchAlert';
import TripleCatchAlert from './alerts/TripleCatchAlert';
import DoubleCatchAlert from './alerts/DoubleCatchAlert';
import AllClearAlert from './alerts/AllClearAlert';
import YootAlert from './alerts/YootAlert';
import MoAlert from './alerts/MoAlert';
import TurnAlert from './alerts/TurnAlert';
import layout from './layout';

export default function MainAlert() {
  const [mainAlert] = useAtom(mainAlertAtom)
  const [animationPlaying] = useAtom(animationPlayingAtom)
  // ok if component re-renders because only one child will be displaying
  const [device] = useAtom(deviceAtom)

  return <group
  position={layout[device].game.mainAlert.position}
  rotation={layout[device].game.mainAlert.rotation}>
    { mainAlert && mainAlert.type === 'turn' && !animationPlaying && <TurnAlert
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 1 && !animationPlaying && <CatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 2 && !animationPlaying && <DoubleCatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 3 && !animationPlaying && <TripleCatchAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'catch' && mainAlert.amount === 4 && !animationPlaying && <AllClearAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'throw' && mainAlert.num === 4 && !animationPlaying && <YootAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
    { mainAlert && mainAlert.type === 'throw' && mainAlert.num === 5 && !animationPlaying && <MoAlert 
      position={[5,3,0]}
      rotation={[0,0,0]}
    /> }
  </group>
}