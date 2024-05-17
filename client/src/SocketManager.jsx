import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";

import { io } from "socket.io-client";

import { boomTextAtom, clientAtom, disconnectAtom, displayMovesAtom, gamePhaseAtom, hasTurnAtom, helperTilesAtom, hostNameAtom, initialYootThrowAtom, legalTilesAtom, messagesAtom, pieceTeam0Id0Atom, pieceTeam0Id1Atom, pieceTeam0Id2Atom, pieceTeam0Id3Atom, pieceTeam1Id0Atom, pieceTeam1Id1Atom, pieceTeam1Id2Atom, pieceTeam1Id3Atom, readyToStartAtom, roomAtom, selectionAtom, spectatorsAtom, teamsAtom, tilesAtom, turnAtom, yootActiveAtom, yootThrowValuesAtom, yootThrownAtom } from "./GlobalState.jsx";
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
  // Use state to check if the game phase changed
  const [gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
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
      console.log(`[SocketManager] socket id`, socket.id)

      setMessages(room.messages)
      setTeams(room.teams)
      setSpectators(room.spectators)

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

      if (room.gamePhase === 'pregame' && room.yootThrown.player && !room.yootThrown.flag && !room.teams[0].pregameRoll && !room.teams[1].pregameRoll) {
        setBoomText('pregameTie')
      }

      setGamePhase((lastPhase) => {
        if (lastPhase === 'pregame' && room.gamePhase === 'game') {
          setBoomText('startGame')
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

      setTurn(room.turn)

      setDisplayMoves(room.teams[room.turn.team].moves)

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
      for (const legalTile of Object.keys(legalTiles)) {
        const path = legalTiles[legalTile].path
        for (let i = 1; i < path.length; i++) {
          const pathTile = path[i]
          let helperText = ''
          if (parseInt(legalTiles[legalTile].move) < 0) {
            helperText = (i * -1)
          } else {
            helperText = i
          }
          if (pathTile === parseInt(legalTile)) {
            if (tiles[pathTile].length === 0) {
              // pass
            } else if (tiles[pathTile][0].team !== selection.pieces[0].team) {
              helperText += ', kick'
            } else if (tiles[pathTile][0].team === selection.pieces[0].team) {
              helperText += ', combine'
            }
          }
          if (!helperTiles[pathTile] || helperTiles[pathTile].length < helperText) {
            helperTiles[pathTile] = helperText
          }
        }
      }
      setHelperTiles(helperTiles)

      setTiles(room.tiles)
    })

    // hybrid: yoot thrown should not be set in room update.
    // it should only be updated on throw yoot (from the server).
    socket.on('throwYoot', ({ yootThrowValues }) => {
      setYootThrowValues(yootThrowValues)
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