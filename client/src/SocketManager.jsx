import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";

import { io } from "socket.io-client";

import { boomTextAtom, pregameAlertAtom, clientAtom, disconnectAtom, displayMovesAtom, gamePhaseAtom, hasTurnAtom, helperTilesAtom, hostNameAtom, initialYootThrowAtom, legalTilesAtom, mainAlertAtom, messagesAtom, particleSettingAtom, pieceTeam0Id0Atom, pieceTeam0Id1Atom, pieceTeam0Id2Atom, pieceTeam0Id3Atom, pieceTeam1Id0Atom, pieceTeam1Id1Atom, pieceTeam1Id2Atom, pieceTeam1Id3Atom, readyToStartAtom, roomAtom, selectionAtom, spectatorsAtom, teamsAtom, tilesAtom, turnAtom, winnerAtom, yootActiveAtom, yootThrowValuesAtom, yootThrownAtom, moveResultAtom, throwResultAtom, throwAlertAtom, turnAlertActiveAtom, animationPlayingAtom } from "./GlobalState.jsx";
import { clientHasTurn } from "./helpers/helpers.js";

const ENDPOINT = 'localhost:5000';

// const ENDPOINT = 'https://yoot-game-6c96a9884664.herokuapp.com/';

export const socket = io(
  ENDPOINT, { 
    query: {
      client: localStorage.getItem('yootGame')
    },
    autoConnect: false,
  },
)

// http://192.168.1.181:3000 //http://192.168.86.158:3000
// export const socket = io("http://192.168.86.158:3000"); // http://192.168.1.181:3000 //http://192.168.86.158:3000
// doesn't work when another app is running on the same port
export const SocketManager = () => {
  const [client, setClient] = useAtom(clientAtom);
  const [teams, setTeams] = useAtom(teamsAtom)
  const [turn, setTurn] = useAtom(turnAtom);
  const [_room, setRoom] = useAtom(roomAtom);
  const [_messages, setMessages] = useAtom(messagesAtom);
  const [_hostName, setHostName] = useAtom(hostNameAtom)
  const [_spectators, setSpectators] = useAtom(spectatorsAtom)
  const [_readyToStart, setReadyToStart] = useAtom(readyToStartAtom)
  const [_yootActive, setYootActive] = useAtom(yootActiveAtom)
  const [_disconnect, setDisconnect] = useAtom(disconnectAtom)
  const [_yootThrowValues, setYootThrowValues] = useAtom(yootThrowValuesAtom)
  const [_initialYootThrow, setInitialYootThrow] = useAtom(initialYootThrowAtom)
  const [_yootThrown, setYootThrown] = useAtom(yootThrownAtom)
  const [_hasTurn, setHasTurn] = useAtom(hasTurnAtom)
  const [_boomText, setBoomText] = useAtom(boomTextAtom)
  const [_mainAlert, setMainAlert] = useAtom(mainAlertAtom)
  const [_animationPlaying, setAnimationPlaying] = useAtom(animationPlayingAtom)
  const [_turnAlertActive, setTurnAlertActive] = useAtom(turnAlertActiveAtom)
  const [_moveResult, setMoveResult] = useAtom(moveResultAtom)
  const [_throwResult, setThrowResult] = useAtom(throwResultAtom)
  const [_pregameAlert, setPregameAlert] = useAtom(pregameAlertAtom)
  const [_throwAlert, setThrowAlert] = useAtom(throwAlertAtom)
  // Use state to check if the game phase changed
  const [_gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [_displayMoves, setDisplayMoves] = useAtom(displayMovesAtom)
  const [_selection, setSelection] = useAtom(selectionAtom)
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom)
  const [_helperTiles, setHelperTiles] = useAtom(helperTilesAtom)
  const [_tiles, setTiles] = useAtom(tilesAtom)
  // Pieces on the board
  const [_pieceTeam0Id0, setPieceTeam0Id0] = useAtom(pieceTeam0Id0Atom)
  const [_pieceTeam0Id1, setPieceTeam0Id1] = useAtom(pieceTeam0Id1Atom)
  const [_pieceTeam0Id2, setPieceTeam0Id2] = useAtom(pieceTeam0Id2Atom)
  const [_pieceTeam0Id3, setPieceTeam0Id3] = useAtom(pieceTeam0Id3Atom)
  const [_pieceTeam1Id0, setPieceTeam1Id0] = useAtom(pieceTeam1Id0Atom)
  const [_pieceTeam1Id1, setPieceTeam1Id1] = useAtom(pieceTeam1Id1Atom)
  const [_pieceTeam1Id2, setPieceTeam1Id2] = useAtom(pieceTeam1Id2Atom)
  const [_pieceTeam1Id3, setPieceTeam1Id3] = useAtom(pieceTeam1Id3Atom)
  const [_winner, setWinner] = useAtom(winnerAtom)
  // UI
  const [_particleSetting, setParticleSetting] = useAtom(particleSettingAtom)

  useEffect(() => {

    console.log("[SocketManager] connect")

    socket.connect();

    socket.on('connect', () => {})
    
    socket.on('connect_error', err => { 
      console.log("[connect_error]", err); 
      setDisconnect(true) 
    })
    
    // socket.on('connect_failed', err => { console.log("[connect_failed]", err); setDisconnect(true) })

    socket.on('room', (room) => {
      console.log(`[SocketManager] room`, room)

      setMessages(room.messages)
      setTeams((prevTeams) => {
        // detect movement
        // so it runs in the same render as the setMainAlert
        const newTeams = room.teams
        for (let i = 0; i < 2; i++) {
          const prevPieces = prevTeams[i].pieces
          const newPieces = newTeams[i].pieces
          for (let j = 0; j < 4; j++) {
            if (prevPieces[j].tile !== newPieces[j].tile) {
              setAnimationPlaying(true)
            }
          }
        }
        
        // detect catch
        // so it runs in the same render as the setMainAlert
        for (let i = 0; i < 2; i++) {
          const enemyTeam = room.turn.team === 1 ? 0 : 1
          const prevPiecesEnemy = prevTeams[enemyTeam].pieces
          const newPiecesEnemy = newTeams[enemyTeam].pieces
          let numCaught = 0
          for (let j = 0; j < 4; j++) {
            if (prevPiecesEnemy[j].tile !== -1 && newPiecesEnemy[j].tile === -1) {
              numCaught++
            }
          }
          if (numCaught > 0) {
            setMainAlert({
              type: 'catch',
              team: room.turn.team,
              amount: numCaught,
              time: Date.now()
            })
          }
        }
        
        return newTeams
      })
      setSpectators(room.spectators)

      // nothing can be rendering MainAlert
      setPieceTeam0Id0(room.teams[0].pieces[0])
      setPieceTeam0Id1(room.teams[0].pieces[1])
      setPieceTeam0Id2(room.teams[0].pieces[2])
      setPieceTeam0Id3(room.teams[0].pieces[3])
      setPieceTeam1Id0(room.teams[1].pieces[0])
      setPieceTeam1Id1(room.teams[1].pieces[1])
      setPieceTeam1Id2(room.teams[1].pieces[2])
      setPieceTeam1Id3(room.teams[1].pieces[3])

      // Set host name for display
      if (room.host !== null) {
        if (room.host.socketId === socket.id) {
          setHostName('you')
        } else {
          setHostName(room.host.name)
        }
      }

      // Find client from users
      let users = room.teams[0].players.concat(room.teams[1].players.concat(room.spectators))
      for (const user of users) {
        if (user.socketId === socket.id) {
          setClient(user)
          localStorage.setItem('yootGame', JSON.stringify({
            ...user
          }))
        }
      }

      if (room.gamePhase === 'pregame' && room.yootThrown.player && !room.yootThrown.flag && (room.teams[0].pregameRoll === null) && (room.teams[1].pregameRoll === null)) {
        setPregameAlert({
          type: 'pregameTie'
        })
      }

      function makeTurnAlertObj(room) {
        const currentTeam = room.turn.team
        const currentPlayer = room.turn.players[currentTeam]
        const alert = {
          type: 'turn',
          team: currentTeam,
          name: room.teams[currentTeam].players[currentPlayer].name
        }
        return alert
      }

      setGamePhase((lastPhase) => {
        if (lastPhase === 'pregame' && room.gamePhase === 'game') {
          setPregameAlert({
            type: 'gameStart',
            team: room.turn.team
          })
          const turnAlert = makeTurnAlertObj(room)
          console.log('[setGamePhase] set main alert')
          setMainAlert(turnAlert)
          // setTurnAlertActive(true)
        } else if (lastPhase === 'finished' && room.gamePhase === 'lobby') {
          // Reset fireworks from win screen
          setParticleSetting(null)
        }
        return room.gamePhase
      });

      const currentTeam = room.turn.team

      // Enable yoot button if client has the turn and his team 
      // has at least one throw and there is a player on the team
      // and the thrown flag is off
      if (room.gamePhase === "lobby" || (room.teams[currentTeam].players.length > 0 && 
      clientHasTurn(socket.id, room.teams, room.turn) &&
      room.teams[currentTeam].throws > 0 && !room.yootThrown.flag)) {
        setYootActive(true)
      } else {
        setYootActive(false)
      }

      setYootThrown(room.yootThrown)

      // Enable 'Let's play' button
      if (room.gamePhase === 'lobby' && 
      room.teams[0].players.length > 0 && 
      room.teams[1].players.length > 0 &&
      room.host.socketId === socket.id) {
        setReadyToStart(true)
      } else {
        setReadyToStart(false)
      }

      setTurn((prevTurn) => {
        // if pregame result points turn to the same person
        // display alert with the same person's name
        if (room.gamePhase !== 'lobby' && prevTurn.team !== room.turn.team) {
          const turnAlert = makeTurnAlertObj(room)
          console.log('[setTurn] set main alert')
          setMainAlert(turnAlert)
        }
        return room.turn
      })
      // setTurn(room.turn)

      // setMoveResult((prevResult) => {
      //   if (room.moveResult.type === 'catch') {
      //     if (prevResult.tile !== room.moveResult.tile 
      //       || prevResult.team !== room.moveResult.team) {
      //       console.log('[setMoveResult] set main alert')
      //       setMainAlert(room.moveResult)
      //     }
      //   }
      //   return room.moveResult
      // })

      setThrowResult((prevResult) => {
        // type: regular, bonus
        // bonus: num, streak
        if (prevResult.time !== room.throwResult.time) {
          if (room.throwResult.type === 'bonus') {
            console.log('[setThrowResult] set main alert')
            setMainAlert({
              type: 'throw',
              num: room.throwResult.num,
              time: room.throwResult.time
            })
          } else {
            setThrowAlert({
              num: room.throwResult.num,
              time: room.throwResult.time
            })
          }
        }
        return room.throwResult
      })

      if (room.gamePhase === 'game') {
        setDisplayMoves(room.teams[room.turn.team].moves)
      }

      if ((room.gamePhase === "pregame" || room.gamePhase === "game") && 
      clientHasTurn(socket.id, room.teams, room.turn)) {

        setHasTurn(true)

      } else {

        setHasTurn(false)

      }

      setSelection(room.selection)
      setLegalTiles(room.legalTiles)
      let helperTiles = {}
      let legalTiles = room.legalTiles
      let tiles = room.tiles
      let selection = room.selection

      // helper tiles
      for (const legalTile of Object.keys(legalTiles)) {
        let moveInfo;
        if (legalTile !== '29') {
          moveInfo = legalTiles[legalTile]
        } else {
          moveInfo = legalTiles[legalTile][0]
        }
        const path = moveInfo.path
        for (let i = 1; i < path.length; i++) {
          const pathTile = path[i]
          let helperText = ''
          if (pathTile === parseInt(legalTile)) { // only do this for destination tiles

            if (legalTile === '29') {
              // pass
            } else {

              if (parseInt(moveInfo.move) < 0) {
                helperText = (i * -1)
              } else {
                helperText = i
              }

              // additional text
              if (tiles[pathTile].length === 0) { // if tile doesn't contain a piece
                // pass
              } else if (tiles[pathTile][0].team !== selection.pieces[0].team) {
                helperText += ', catch'
              } else if (tiles[pathTile][0].team === selection.pieces[0].team) {
                helperText += ', piggyback'
              }
            } 
          }

          // if tiles have no text or text length is longer than the existing one
          if (!helperTiles[pathTile] || helperTiles[pathTile].length < helperText) {
            helperTiles[pathTile] = helperText
          }
        }
      }
      
      setHelperTiles(helperTiles)

      setTiles(room.tiles)

      // result logic
      if (room.results.length === 0) {
        setWinner(-1)
      } else {
        setWinner(room.results[room.results.length-1])
      }

      // score animation
      // loop through pieces in each team
      // compared to last state, if any of them scored,
      // display score animation

    })

    // hybrid: yoot thrown should not be set in room update.
    // it should only be updated on throw yoot (from the server).
    socket.on('throwYoot', ({ yootThrowValues, yootThrown }) => {
      setYootThrowValues(yootThrowValues)
      setYootThrown(yootThrown)
      // Disable the yoot button
      setYootActive(false)
      // Enable meteors
      setInitialYootThrow(false)
    })

    socket.on('disconnect', () => {
      console.log("[disconnect]")
      setDisconnect(true);
    })

    return () => {
      socket.disconnect()

      socket.off();
    }
  }, [])
};