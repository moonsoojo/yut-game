import { useEffect } from "react";
import { useAtom } from "jotai";

import { io } from "socket.io-client";

import { clientAtom, disconnectAtom, gamePhaseAtom, hostNameAtom, initialYootThrowAtom, messagesAtom, readyToStartAtom, roomAtom, spectatorsAtom, teamsAtom, turnAtom, yootActiveAtom, yootThrowValuesAtom, yootThrownAtom } from "./GlobalState.jsx";

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
  const [_gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [_yootActive, setYootActive] = useAtom(yootActiveAtom)
  const [_disconnect, setDisconnect] = useAtom(disconnectAtom)
  const [_yootThrowValues, setYootThrowValues] = useAtom(yootThrowValuesAtom)
  const [_initialYootThrow, setInitialYootThrow] = useAtom(initialYootThrowAtom)
  const [_yootThrown, setYootThrown] = useAtom(yootThrownAtom)

  useEffect(() => {

    console.log("[SocketManager] connect")

    socket.connect();

    socket.on('connect', () => {})

    socket.on('client', (data) => {
      console.log(`[SocketManager] client`, data)
      setClient(data)
    })

    socket.on('room', (data) => {
      console.log(`[SocketManager] room`, data)
      setRoom(data)
    })

    socket.on('connect_error', err => { 
      console.log("[connect_error]", err); 
      setDisconnect(true) 
    })
    // socket.on('connect_failed', err => { console.log("[connect_failed]", err); setDisconnect(true) })

    return () => {
      socket.disconnect()

      socket.off();
    }
  }, []);

  useEffect(() => {
    socket.on('room', (room) => {
      console.log(`[SocketManager] room`, room)

      setMessages(room.messages)
      setTeams(room.teams)
      setSpectators(room.spectators)

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

      setGamePhase(room.gamePhase);

      // Enable yoot button if client has the turn and his team 
      // has at least one throw and there is a player on the team
      // and the thrown flag is off
      const currentTeam = room.turn.team
      const currentPlayer = room.turn.players[turn.team]
      if (room.gamePhase === "lobby" || (room.teams[currentTeam].players.length > 0 && 
      room.teams[currentTeam].players[currentPlayer].socketId === socket.id &&
      room.teams[currentTeam].throws > 0 &&
      !room.yootThrown)) {
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
  }, [])

  // updating on teams change might cause issues
  // if players leave and player index from turn
  // is out of range
  useEffect(() => {

  }, [client, turn])
};