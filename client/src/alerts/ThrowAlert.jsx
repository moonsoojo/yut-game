import { Float } from "@react-three/drei";
import { throwAlertAtom } from "../GlobalState";
import { useSpring } from "@react-spring/three";
import { useAtom } from "jotai";
import GeAlert from "./GeAlert";
import GulAlert from "./GulAlert";
import BackdoAlert from "./BackdoAlert";
import OutAlert from "./OutAlert";
import DoAlert from "./DoAlert";
import YootAlertPregame from "./YootAlertPregame";
import MoAlertPregame from "./MoAlertPregame";

export default function ThrowAlert({ position=[0,0,0], rotation, initialScale }) {
  const [throwAlert, setThrowAlert] = useAtom(throwAlertAtom)

  const springs = useSpring({
    from: {
      scale: 0
    },
    to: [
      {
        scale: initialScale,
        // Specify config here for animation to not trigger again before delay ends
        config: {
          tension: 170,
          friction: 26
        }
      },
      {
        scale: 0,
        config: {
          tension: 170,
          friction: 26
        },
        delay: 3000
      }
    ],
    loop: false,
    reset: true,
  })

  return <group position={position} rotation={rotation}>
    { throwAlert && throwAlert.num === 1 && <DoAlert 
      position={[0,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}/> }
    { throwAlert && throwAlert.num === 2 && <GeAlert 
      position={[0,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}/> }
    { throwAlert && throwAlert.num === 3 && <GulAlert 
      position={[0,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}/> }
    {/* only for pregame */}
    { throwAlert && throwAlert.num === 4 && <YootAlertPregame 
      position={[0,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}/> }
    {/* only for pregame */}
    { throwAlert && throwAlert.num === 5 && <MoAlertPregame 
      position={[0,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}/> }
    { throwAlert && throwAlert.num === -1 && <BackdoAlert 
      position={[0,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}/> }
    { throwAlert && throwAlert.num === 0 && <OutAlert 
      position={[0,3,0]}
      rotation={[0,0,0]}
      scale={springs.scale}/> }
  </group>
}