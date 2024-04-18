// import { useAtom } from 'jotai';
// import React, { useState } from 'react';
// import { clientAtom, gamePhaseAtom, teamsAtom, turnAtom } from './SocketManager';
// import layout from './layout';
// import Piece from './components/Piece';
// import HtmlElement from './HtmlElement';
// import JoinTeamModal from './JoinTeamModal';
// import { joinTeamAtom } from './GlobalState';
// import { Html } from '@react-three/drei';
// import Stars from './particles/Stars';
// import MilkyWay from './shader/MilkyWay';
// import * as THREE from 'three';
// import Tips from './Tips';
// import Tiles from './Tiles';
// import YootButton from './YootButton';
// import Chatbox from './Chatbox';

// // all "atoms" get state individually
// // clicking on one component should not rerender the parent
// export default function Guide({ device="landscapeDesktop" }) {
//     console.log('Guide')
//     function HomePieces({team, scale=1, position}) {
        
//         const [teams] = useAtom(teamsAtom);

//         let space = layout[device].homePieces[team].space;
//         let positionStartX = 0
//         let positionStartY = 0
//         let positionStartZ = 0.5
    
//         return (
//           <group scale={scale} position={position}>
//             {teams[team].pieces.map((value, index) =>
//               value == null ? (
//                 <mesh
//                   position={[
//                     positionStartX + index * space,
//                     positionStartY,
//                     positionStartZ,
//                   ]}
//                   key={index}
//                 >
//                   <sphereGeometry args={[0.2]} />
//                 </mesh>
//               ) : value === "scored" ? (
//                 <mesh
//                   position={[
//                     positionStartX + index * space,
//                     positionStartY,
//                     positionStartZ,
//                   ]}
//                   key={index}
//                 >
//                   <sphereGeometry args={[0.2]} />
//                   <meshStandardMaterial color={team == 0 ? "red" : "green"} />
//                 </mesh>
//               ) : (
//                   <Piece
//                     position={[
//                     positionStartX + index * space,
//                     positionStartY,
//                     positionStartZ,
//                   ]}
//                   rotation={layout[device].homePieces[team].rotation}
//                   keyName={`count${index}`}
//                   tile={-1}
//                   team={team}
//                   id={value.id}
//                   key={index}
//                   scale={1}
//                 />
//               )
//             )}
//           </group>
//         );
//     }

//     function JoinTeam0() {
//         const [client] = useAtom(clientAtom);
//         const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
//         function handleJoinTeam0 () {
//             setJoinTeam(0);
//         }
//         return client.team !== 0 && joinTeam !== 0 && <HtmlElement
//             text="JOIN"
//             position={layout[device].team0.join.position}
//             rotation={layout[device].team0.join.rotation}
//             fontSize={layout[device].team0.join.fontSize}
//             handleClick={handleJoinTeam0}
//         /> 
//     }

//     function Team0Ids() {
//         const [teams] = useAtom(teamsAtom)
//         const [turn] = useAtom(turnAtom)
//         const [gamePhase] = useAtom(gamePhaseAtom)
//         return <Html
//             position={layout[device].team0.names.position}
//             rotation={layout[device].team0.names.rotation}
//             transform
//         >
//             <div style={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 flexDirection: 'row',
//                 width: '200px',
//                 position: 'absolute',
//                 width: `${layout[device].team0.names.divWidth}px`,
//                 WebkitUserSelect: 'none'
//             }}>
//             {teams[0].players.map((value, index) => (
//                 <div
//                     style={{
//                         color: (turn.team == 0 && turn.players[turn.team] == index && gamePhase !== "lobby")
//                         ? "white"
//                         : "yellow",
//                         fontFamily: 'Luckiest Guy',
//                         fontSize: '15px',
//                         padding: layout[device].team0.names.padding,
//                     }}
//                     key={index}
//                 >
//                     {value.name}
//                 </div>
//             ))}
//             </div>
//         </Html>
//     }

//     function JoinTeam1() {
//         const [client] = useAtom(clientAtom);
//         const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
//         function handleJoinTeam1 () {
//             setJoinTeam(1);
//         }
//         return client.team !== 1 && joinTeam !== 1 && <HtmlElement
//             text="JOIN"
//             position={layout[device].team1.join.position}
//             rotation={layout[device].team1.join.rotation}
//             fontSize={layout[device].team1.join.fontSize}
//             handleClick={handleJoinTeam1}
//         /> 
//     }

//     function Team1Ids() {
//         const [teams] = useAtom(teamsAtom)
//         const [turn] = useAtom(turnAtom)
//         const [gamePhase] = useAtom(gamePhaseAtom)
//         return <Html
//             position={layout[device].team1.names.position}
//             rotation={layout[device].team1.names.rotation}
//             transform
//         >
//             <div style={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 flexDirection: 'row',
//                 width: '200px',
//                 position: 'absolute',
//                 width: `${layout[device].team1.names.divWidth}px`,
//                 WebkitUserSelect: 'none'
//             }}>
//             {teams[1].players.map((value, index) => (
//                 <div
//                     style={{
//                         color: (turn.team == 1 && turn.players[turn.team] == index && gamePhase !== "lobby")
//                         ? "white"
//                         : "yellow",
//                         fontFamily: 'Luckiest Guy',
//                         fontSize: '15px',
//                         padding: layout[device].team1.names.padding,
//                     }}
//                     key={index}
//                 >
//                     {value.name}
//                 </div>
//             ))}
//             </div>
//         </Html>
//     }

//     function PiecesSection({position, scale}) {
//       const [client] = useAtom(clientAtom)
//       const [gamePhase] = useAtom(gamePhaseAtom)
//       const [teams] = useAtom(teamsAtom)

//       const newHomePiecePositions = [
//           [0.5, 0, 0],
//           [1.5, 0, 0],
//           [0.5, 0, 1],
//           [1.5, 0, 1]
//       ]
//       const ufoHomePositions = [
//           [0.5, 0, -0.5],
//           [1.5, 0, -0.5],
//           [0.5, 0, 0.5],
//           [1.5, 0, 0.5]
//       ]
//       const movesText = `Moves: 2`

//       if (client.team != undefined) {
//         return (
//           <group position={position} scale={scale}>
//             { (gamePhase === "game" && 29 in legalTiles) ?
//               <ScoreButton
//                 position={[0,0,0]}
//                 device={device}
//               /> :
//               teams[client.team].pieces.map((value, index) =>
//                 value == null ? (
//                   <mesh
//                     position={newHomePiecePositions[index]}
//                     key={index}
//                   >
//                     <sphereGeometry args={[0.2]} />
//                   </mesh>
//                 ) : value === "scored" ? (
//                   <mesh
//                     position={newHomePiecePositions[index]}
//                     key={index}
//                   >
//                     <sphereGeometry args={[0.2]} />
//                     <meshStandardMaterial color={client.team == 0 ? "red" : "green"} />
//                   </mesh>
//                 ) : (
//                   <Piece
//                     position={
//                       client.team == 0 
//                       ? newHomePiecePositions[index]
//                       : ufoHomePositions[index]
//                     }
//                     rotation={layout[device].homePieces[client.team].rotation}
//                     keyName={`count${index}`}
//                     tile={-1}
//                     team={client.team}
//                     id={value.id}
//                     key={index}
//                     scale={1}
//                   />
//                 )
//               )
//             }
//             {/* moves */}
//             <>
//               <HtmlElement
//                 text={movesText}
//                 position={layout[device].moves.text.position}
//                 rotation={layout[device].moves.text.rotation}
//                 fontSize={layout[device].moves.text.fontSize}
//               />
//             </>
//           </group>
//         )
//       } else {
//         return (      
//           <group position={layout[device].piecesSection.position} scale={layout[device].piecesSection.scale}>
//             {teams[0].pieces.map((value, index) =>
//               (<mesh
//                 position={newHomePiecePositions[index]}
//                 key={index}
//               >
//                 <boxGeometry args={[0.4, 0.4, 0.4]} />
//                 <meshStandardMaterial color="#505050"/>
//               </mesh>))}
//           </group>
//         )
//       }
//     }
//     function handleTips() {
//       console.log('[Guide] tips')
//     }
//     function handleInvite() {
//       console.log('[Guide] invite')
//     }
//     function handleDiscord() {
//       console.log('[Guide] discord')
//     }
//     function handleRulebook() {
//       console.log('[Guide] rulebook')
//     }
//     function handleSettings() {
//       console.log('[Guide] settings')
//     }

//     return <group name='guide'>
//         <group
//             position={layout[device].team0.position}
//             scale={layout[device].team0.scale}
//         >
//             <HtmlElement
//               text="Rockets"
//               position={layout[device].team0.title.position}
//               rotation={layout[device].team0.title.rotation}
//               color="red"
//             />
//             <HomePieces team={0} scale={0.5} position={layout[device].team0.pieces.position}/>
//             <JoinTeam0/>
//             <Team0Ids/>
//         </group>
//         <group
//             position={layout[device].team1.position}
//             scale={layout[device].team1.scale}
//         >
//             <HtmlElement
//               text="UFOs"
//               position={layout[device].team1.title.position}
//               rotation={layout[device].team1.title.rotation}
//               color="turquoise"
//             />
//             <HomePieces team={1} scale={0.5} position={layout[device].team1.pieces.position}/>
//             <JoinTeam1/>
//             <Team1Ids/>
//         </group>
//         <JoinTeamModal
//           position={layout[device].joinTeamModal.position}
//           rotation={layout[device].joinTeamModal.rotation}
//           scale={layout[device].joinTeamModal.scale}
//         />
//         <HtmlElement
//           text='Rules'
//           position={layout[device].rulebookButton.position}
//           rotation={layout[device].rulebookButton.rotation}
//           fontSize={layout[device].rulebookButton.fontSize}
//           handleClick={handleRulebook}
//         />
//         <HtmlElement
//           text='Settings'
//           position={layout[device].settings.position}
//           rotation={layout[device].settings.rotation}
//           fontSize={layout[device].settings.fontSize}
//           handleClick={handleSettings}
//         />
//         <PiecesSection 
//           position={layout[device].piecesSection.position}
//           scale={layout[device].piecesSection.scale}
//         />
//         <HtmlElement
//           text={`Tips`}
//           position={layout[device].tips.button.position} 
//           rotation={layout[device].tips.button.rotation}
//           fontSize={layout[device].tips.button.fontSize}
//           handleClick={handleTips}
//         />
//         <HtmlElement
//           text={`Invite`}
//           position={layout[device].invite.position} 
//           rotation={layout[device].invite.rotation}
//           fontSize={layout[device].invite.fontSize}
//           handleClick={handleInvite}
//         />
//         <HtmlElement
//           text={`Discord`}
//           position={layout[device].discord.position} 
//           rotation={layout[device].discord.rotation}
//           fontSize={layout[device].discord.fontSize}
//           handleClick={handleDiscord}
//         />
//         <Chatbox
//           position={layout[device].chat.position}
//           rotation={layout[device].chat.rotation}
//           scale={layout[device].chat.scale}
//           device={device}
//         />
//         <Tiles device={device} scale={0.6} showStart/>
//         <Stars/>
//         <MilkyWay 
//           rotation={[-Math.PI/2, 0, -35.0]} 
//           position={[0, -3, 0]}
//           scale={5}
//           brightness={0.5}
//           colorTint1={new THREE.Vector4(0, 1, 1, 1.0)}
//           colorTint2={new THREE.Vector4(0, 1, 1, 1.0)}
//           colorTint3={new THREE.Vector4(0, 1, 1, 1.0)}
//         />
//         <Tips/>
//     </group>
// }