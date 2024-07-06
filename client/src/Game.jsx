// js
import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import layout from "./layout.js";
import { useSpring, animated } from '@react-spring/three';

// custom components
import Chatbox from "./Chatbox.jsx";
import Yoot from "./Yoot.jsx";
import Board from "./Board.jsx";
import PiecesSection from "./PiecesSection.jsx";
import Team from "./Team.jsx";
import GameCamera from "./GameCamera.jsx";
import DisconnectModal from "./DisconnectModal.jsx";
import JoinTeamModal from "./JoinTeamModal.jsx";

// three js
// import { Leva, useControls } from "leva"
// import { Perf } from 'r3f-perf'

// server
import { socket } from "./SocketManager";
import { useParams } from "wouter";
import { 
  deviceAtom, 
  readyToStartAtom, 
  hostNameAtom, 
  disconnectAtom, 
  gamePhaseAtom, 
  turnAtom,
  teamsAtom,
  legalTilesAtom,
  tilesAtom,
  helperTilesAtom,
  winnerAtom,
} from "./GlobalState.jsx";
import Rocket from "./meshes/Rocket.jsx";
import Ufo from "./meshes/Ufo.jsx";
import MoveList from "./MoveList.jsx";
import PiecesOnBoard from "./PiecesOnBoard.jsx";
import ScoreButtons from "./ScoreButtons.jsx";
import RocketsWin from "./RocketsWin.jsx";
import UfosWin from "./UfosWin.jsx";
import { Text3D } from "@react-three/drei";
import { Color, MeshStandardMaterial } from "three";
import { formatName } from "./helpers/helpers.js";
import { useFrame } from "@react-three/fiber";
import Star from "./meshes/Star.jsx";

// There should be no state
export default function Game() {
  
  const [device] = useAtom(deviceAtom)
  const [disconnect] = useAtom(disconnectAtom)
  // To adjust board size
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [turn] = useAtom(turnAtom)
  // To pass to Board
  const [legalTiles] = useAtom(legalTilesAtom)
  const [helperTiles] = useAtom(helperTilesAtom)
  const [tiles] = useAtom(tilesAtom)
  const [winner] = useAtom(winnerAtom)
  const params = useParams();

  useEffect(() => {
    socket.emit('joinRoom', { roomId: params.id })
  }, [])

  // 2d, flat
  // 3d, animated, border moving and scales from 0 to 1
  function LetsPlayButton({ position }) {
    const [readyToStart] = useAtom(readyToStartAtom)
    const [hostName] = useAtom(hostNameAtom)
    
    function DisabledButton({ position, scale }) {
      return <group position={position} scale={scale}>
        <mesh>
          <boxGeometry args={[1.4, 0.03, 1.2]}/>
          <meshStandardMaterial color='grey'/>
        </mesh>
        <mesh>
          <boxGeometry args={[1.35, 0.04, 1.15]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.letsPlayButton.disabledButton.text.position}
          rotation={layout[device].game.letsPlayButton.disabledButton.text.rotation}
          size={layout[device].game.letsPlayButton.disabledButton.text.size}
          height={layout[device].game.letsPlayButton.disabledButton.text.height}
          lineHeight={layout[device].game.letsPlayButton.disabledButton.text.lineHeight}
        >
          {`lets\nplay!`}
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group>
    }

    function ActivatedButton() {

      const [hover, setHover] = useState(false)
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
          borderMesh0Ref,
          borderMesh1Ref,
          borderMesh2Ref,
          borderMesh3Ref,
          borderMesh4Ref,
          borderMesh5Ref,
          borderMesh6Ref
      ]
      const buttonGroupRef = useRef();
  
      const backdropHeight = layout[device].game.letsPlayButton.activeButton.backdropHeight
      const backdropWidth = layout[device].game.letsPlayButton.activeButton.backdropWidth
      useFrame((state, delta) => {
          for (let i = 0; i < borderMeshRefs.length; i++) {      
            borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * backdropWidth
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * backdropHeight
          }
          buttonGroupRef.current.scale.x = Math.cos(state.clock.elapsedTime*3)*0.05 + 0.9
          buttonGroupRef.current.scale.y = Math.cos(state.clock.elapsedTime*3)*0.05 + 0.9
          buttonGroupRef.current.scale.z = Math.cos(state.clock.elapsedTime*3)*0.05 + 0.9
      })
  
      function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
      }
      
      function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
      }

      function handlePointerDown(e) {
        e.stopPropagation();
        // only throws for the client
        if (readyToStart) {
          socket.emit("startGame", { roomId: params.id })
        }
      }

      const springs = useSpring({
        from: {
          scale: 0
        },
        to: [
          {
            scale: layout[device].game.letsPlayButton.activeButton.scale,
            config: {
              tension: 170,
              friction: 26
            },
          }
        ],
        // don't have to reset since component is conditionally rendered
      })
  
      return <animated.group name='animated-group' scale={springs.scale}>
        <group name='lets-play-button-active' 
        position={layout[device].game.letsPlayButton.activeButton.position} 
        ref={buttonGroupRef}>
          <mesh 
            position={[0, 0, 0]} 
            rotation={[0, 0, 0]} 
            scale={[backdropWidth, 0.1, backdropHeight]} 
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
          >
            <cylinderGeometry args={[1, 1, 0.1, 48]}/>
            <meshStandardMaterial color={hover ? 'yellow' : 'green'} transparent opacity={hover ? 0.3 : 0.2} />
          </mesh>
          <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={layout[device].game.letsPlayButton.activeButton.text.position}
              rotation={layout[device].game.letsPlayButton.activeButton.text.rotation}
              size={layout[device].game.letsPlayButton.activeButton.text.size}
              height={layout[device].game.letsPlayButton.activeButton.text.height}
              lineHeight={layout[device].game.letsPlayButton.activeButton.text.lineHeight}
          >
              {`Let's\nPlay!`}
              <meshStandardMaterial color={hover ? 'green' : 'yellow'}/>
          </Text3D>
          <group ref={borderMesh0Ref}>
              <Star scale={0.15} color={hover ? 'green' : 'yellow'}/>
          </group>
          <group ref={borderMesh1Ref}>
              <Star scale={0.15} color={hover ? 'green' : 'yellow'}/>
          </group>
          <group ref={borderMesh2Ref}>
              <Star scale={0.15} color={hover ? 'green' : 'yellow'}/>
          </group>
          <group ref={borderMesh3Ref}>
              <Star scale={0.15} color={hover ? 'green' : 'yellow'}/>
          </group>
          <group ref={borderMesh4Ref}>
              <Star scale={0.15} color={hover ? 'green' : 'yellow'}/>
          </group>
          <group ref={borderMesh5Ref}>
              <Star scale={0.15} color={hover ? 'green' : 'yellow'}/>
          </group>
          <group ref={borderMesh6Ref}>
              <Star scale={0.15} color={hover ? 'green' : 'yellow'}/>
          </group>
        </group>
      </animated.group>
    }

    return <>
      { hostName === 'you' && gamePhase === 'lobby' && <group position={position}>
        { readyToStart ? <ActivatedButton/> : <DisabledButton 
        position={layout[device].game.letsPlayButton.disabledButton.position}
        scale={layout[device].game.letsPlayButton.disabledButton.scale}
        /> }
      </group> }
    </>
  }

  function HostName({ position, rotation }) {
    const [hostName] = useAtom(hostNameAtom)
    return <group position={position} rotation={rotation}>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        size={layout[device].game.hostName.size}
        height={layout[device].game.hostName.height}
      >
        {`HOST: ${hostName}`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  function CurrentPlayer({ position, pieceScale }) {
    const [teams] = useAtom(teamsAtom)

    // If player disconnects, and there's no player remaining in the team,
    // don't display a name
    const player = teams[turn.team].players[turn.players[turn.team]]
    const name = player ? player.name : ''

    return <group position={position}>
      { turn.team === 0 && <Rocket
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={pieceScale}
        animation={null}
      />}
      { turn.team === 1 && <Ufo
        position={[0, 0, 0.2]}
        rotation={[0, 0, 0]}
        scale={pieceScale}
        animation={null}
      />}
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.currentPlayer.text.position}
        rotation={layout[device].game.currentPlayer.text.rotation}
        size={layout[device].game.currentPlayer.text.size}
        height={layout[device].game.currentPlayer.text.height}
      >
        {`${formatName(name)}`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  function handleInvite() {

  }

  function handleDiscord() {

  }

  function handleRules() {

  }

  function handleSettings() {

  }

  // Animations
  const { boardScale, boardPosition, gameScale, winScreenScale } = useSpring({
    boardScale: layout[device].game.board[gamePhase].scale,
    boardPosition: layout[device].game.board[gamePhase].position,
    gameScale: gamePhase !== 'finished' ? 1 : 1,
    winScreenScale: gamePhase === 'finished' ? 1 : 0
  })

  function InviteButton({ position }) {
    const yellowMaterial = new MeshStandardMaterial({ color: new Color('yellow')});

    function handlePointerEnter(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('green')
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('yellow')
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      console.log('invite button click')
    }

    return <group position={position}>
      <mesh
        material={yellowMaterial}
      >
        <boxGeometry args={[1.5, 0.03, 0.55]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.45, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.2, 0.1, 0.6]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.61, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={layout[device].game.invite.size}
        height={layout[device].game.invite.height}
        material={yellowMaterial}
      >
        Invite
      </Text3D>
    </group>
  }

  function DiscordButton({ position }) {
    const yellowMaterial = new MeshStandardMaterial({ color: new Color('yellow')});

    function handlePointerEnter(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('green')
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('yellow')
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      console.log('discord button click')
    }

    return <group position={position}>
      <mesh
        material={yellowMaterial}
      >
        <boxGeometry args={[1.83, 0.03, 0.55]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.77, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.2, 0.1, 0.6]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.77, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={layout[device].game.discord.size}
        height={layout[device].game.discord.height}
        material={yellowMaterial}
      >
        DISCORD
      </Text3D>
    </group>
  }

  function SettingsButton({ position, scale }) {
    const yellowMaterial = new MeshStandardMaterial({ color: new Color('yellow')});

    function handlePointerEnter(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('green')
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('yellow')
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      console.log('settings button click')
    }

    return <group position={position} scale={scale}>
      <mesh
        material={yellowMaterial}
      >
        <boxGeometry args={[2.05, 0.03, 0.55]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[2, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.2, 0.1, 0.6]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.settings.text.position}
        rotation={layout[device].game.settings.text.rotation}
        size={layout[device].game.settings.text.size}
        height={layout[device].game.settings.text.height}
        material={yellowMaterial}
      >
        Settings
      </Text3D>
    </group>
  }

  function RulebookButton({ position, scale }) {
    const yellowMaterial = new MeshStandardMaterial({ color: new Color('yellow')});

    function handlePointerEnter(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('green')
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('yellow')
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      console.log('settings button click')
    }

    return <group position={position} scale={scale}>
      <mesh
        material={yellowMaterial}
      >
        <boxGeometry args={[1.4, 0.03, 0.55]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.35, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.2, 0.1, 0.6]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.rulebookButton.text.position}
        rotation={layout[device].game.rulebookButton.text.rotation}
        size={layout[device].game.rulebookButton.text.size}
        height={layout[device].game.rulebookButton.text.height}
        material={yellowMaterial}
      >
        Rules
      </Text3D>
    </group>
  }

  // UI prop guideline
  // Pass position, rotation and scale
  // pass device if component has another responsive attribute
    // such as HtmlElement fontsize or team display
    // children positions
  // If state is contained globally, don't pass it as a prop
    // example: <Host/> is in this component. 'device' is
    // declared at the top. don't pass it in as a prop

  return (<>
      {/* <Perf/> */}
      {/* <Leva hidden /> */}
      <GameCamera position={layout[device].camera.position}/>
      { gamePhase !== 'finished' && <animated.group scale={gameScale}>
        <Team 
          position={layout[device].game.team0.position}
          scale={layout[device].game.team0.scale}
          device={device}
          team={0} 
        />
        <Team 
          position={layout[device].game.team1.position}
          scale={layout[device].game.team1.scale}
          device={device}
          team={1} 
        />
        <JoinTeamModal 
          position={layout[device].game.joinTeamModal.position}
          rotation={layout[device].game.joinTeamModal.rotation}
          scale={layout[device].game.joinTeamModal.scale}
        />
        { !disconnect && <Chatbox 
          position={layout[device].game.chat.position}
          rotation={layout[device].game.chat.rotation}
          scale={layout[device].game.chat.scale}
          device={device}
        /> }
        <InviteButton position={layout[device].game.invite.position}/>
        <DiscordButton position={layout[device].game.discord.position}/>
        { disconnect && <DisconnectModal
          position={layout[device].game.disconnectModal.position}
          rotation={layout[device].game.disconnectModal.rotation}
        /> }
        <LetsPlayButton
          position={layout[device].game.letsPlayButton.position}
          rotation={layout[device].game.letsPlayButton.rotation}
        />
        {/* <HostName
          position={layout[device].game.hostName.position}
          rotation={layout[device].game.hostName.rotation}
        /> */}
        <animated.group position={boardPosition} scale={boardScale}>
          <Board 
            position={[0,0,0]}
            rotation={[0,0,0]}
            scale={1}
            tiles={tiles}
            legalTiles={legalTiles}
            helperTiles={helperTiles}
            interactive={true}
            showStart={true}
            device={device}
          />
        </animated.group>
        {/* Who Goes First components */}
        { gamePhase === "pregame" && <group>
          <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.whoGoesFirst.title.position}
          rotation={layout[device].game.whoGoesFirst.title.rotation}
          size={layout[device].game.whoGoesFirst.title.size}
          height={layout[device].game.whoGoesFirst.title.height}
          >
            {`Who goes first?`}
            <meshStandardMaterial color="limegreen"/>
          </Text3D>
          <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.whoGoesFirst.description.position}
          rotation={layout[device].game.whoGoesFirst.description.rotation}
          size={layout[device].game.whoGoesFirst.description.size}
          height={layout[device].game.whoGoesFirst.title.height}
          lineHeight={layout[device].game.whoGoesFirst.title.lineHeight}
          >
            {`One player from each team throws\nthe yoot. The team with a higher\nnumber goes first.`}
            <meshStandardMaterial color="limegreen"/>
          </Text3D>
        </group>}
        <Yoot device={device}/>
        <SettingsButton 
        position={layout[device].game.settings.position}
        scale={layout[device].game.settings.scale}/>
        <RulebookButton 
        position={layout[device].game.rulebookButton.position}
        scale={layout[device].game.rulebookButton.scale}
        />
        { (device === 'landscapeDesktop' || (device === 'portrait' && !(29 in legalTiles))) && <PiecesSection 
        position={layout[device].game.piecesSection.position}
        device={device}
        /> }
        { (29 in legalTiles) && <ScoreButtons
          position={layout[device].game.scoreButtons.position}
          rotation={layout[device].game.scoreButtons.rotation}
          legalTiles={legalTiles}
        /> }
        <PiecesOnBoard/>
        { gamePhase === 'game' && <MoveList
          position={layout[device].game.moveList.position}
          rotation={layout[device].game.moveList.rotation}
          tokenScale={layout[device].game.moveList.tokenScale}
          tokenPosition={layout[device].game.moveList.tokenPosition}
        /> }
        {/* { (gamePhase === "pregame" || gamePhase === "game") && <CurrentPlayer 
          position={layout[device].game.currentPlayer.position} 
          rotation={layout[device].game.currentPlayer.rotation}
          fontSize={layout[device].game.currentPlayer.fontSize}
        /> } */}
        </animated.group>
      }
      { gamePhase === 'finished' && <animated.group scale={winScreenScale}>
        { (gamePhase === 'finished' && winner === 0) && <RocketsWin/>}
        { (gamePhase === 'finished' && winner === 1) && <UfosWin/>}
      </animated.group> }
    </>
  );
}