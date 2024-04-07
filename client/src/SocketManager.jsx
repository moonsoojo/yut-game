import { useEffect } from "react";
import { useAtom, atom } from "jotai";

import { io } from "socket.io-client";
import { useParams } from "wouter";

import initialState from "../initialState.js"; 

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

export const yootThrowValuesAtom = atom(null)
export const selectionAtom = atom(null);
export const charactersAtom = atom([]);
export const tilesAtom = atom(JSON.parse(JSON.stringify(initialState.tiles)));
export const teamsAtom = atom(JSON.parse(JSON.stringify(initialState.teams)));
export const turnAtom = atom(JSON.parse(JSON.stringify(initialState.turn)));
export const readyToStartAtom = atom(false);
export const gamePhaseAtom = atom("lobby");
export const displayScoreOptionsAtom = atom(false);
export const legalTilesAtom = atom({});
export const messagesAtom = atom([]);
export const nameAtom = atom('');
export const roomAtom = atom({})
export const winnerAtom = atom(null)
export const disconnectAtom = atom(false)
export const displayDisconnectAtom = atom(false)
export const celebrateTextAtom = atom(null)
export const celebrateMeteorsAtom = atom(false)
export const thrownAtom = atom(false)
export const hostNameAtom = atom('')
export const roomIdAtom = atom('')
// possible values: ['bonus turn', 'out of bounds', 'your turn!', 'who goes first?']
export const boomTextAtom = atom('')
export const particleSettingAtom = atom(null)

// new atoms
export const usersAtom = atom({})
export const clientAtom = atom({
  _id: 'undefined',
  name: 'undefined',
  roomId: 'undefined',
  team: -1
})

export const SocketManager = () => {
  const [_selection, setSelection] = useAtom(selectionAtom);
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_tiles, setTiles] = useAtom(tilesAtom);
  const [teams, setTeams] = useAtom(teamsAtom);
  const [_readyToStart, setReadyToStart] = useAtom(readyToStartAtom);
  const [_yootThrowValues, setYootThrowValues] = useAtom(yootThrowValuesAtom);
  const [_turn, setTurn] = useAtom(turnAtom);
  const [_gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [celebrateText, setCelebrateText] = useAtom(celebrateTextAtom)
  const [celebrateMeteors, setCelebrateMeteors] = useAtom(celebrateMeteorsAtom)
  const [_hostName, setHostName] = useAtom(hostNameAtom)
  const [_roomId, setRoomId] = useAtom(roomIdAtom)
  // UI updates
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [room, setRoom] = useAtom(roomAtom);
  const [_winner, setWinner] = useAtom(winnerAtom)
  const [_disconnect, setDisconnect] = useAtom(disconnectAtom)
  const [displayDisconnect] = useAtom(displayDisconnectAtom)
  const [_thrown, setThrown] = useAtom(thrownAtom)
  const [_boomText, setBoomText] = useAtom(boomTextAtom);

  // new setters
  const [_users, setUsers] = useAtom(usersAtom);
  const [_client, setClient] = useAtom(clientAtom);
  const params = useParams();

  useEffect(() => {

    console.log("[SocketManager] connect")

    if (!displayDisconnect) {

      socket.connect();

      socket.on('connect', () => { console.log("[connect]"); setDisconnect(false) })
      socket.on('connect_error', err => { console.log("[connect_error]", err); setDisconnect(true) })
      // socket.on('connect_failed', err => { console.log("[connect_failed]", err); setDisconnect(true) })
  
      socket.emit("createRoom", { id: (params.id).toUpperCase() }, ({ roomId, error }) => {
        if (error) {
          console.log('[createRoom] error', roomId, error)
        }
        console.log('[createRoom] joinRoom')
        socket.emit('joinRoom', { 
          roomId, 
          savedClient: localStorage.getItem('yootGame') 
        }, ({ joinRoomId, error }) => {
          if (error) {
            console.log("[joinRoom] error", joinRoomId, error)
          }
        })
      })
  
      return () => {
        socket.disconnect()
  
        socket.off();
      }
    }
  }, []);

  useEffect(() => {
    console.log('[SocketManager] room', room)
  }, [room])

  useEffect(() => {
    socket.on('room', (room) => {
      setMessages(room.messages)
      setClient(room.users[socket.id])
      setUsers(room.users)
      // setTeams(room.teams);
      // setGamePhase(room.gamePhase);
      // setTiles(room.tiles);
      // setTurn(room.turn);
      // setLegalTiles(room.legalTiles);
      // setSelection(room.selection);
      // // setReadyToStart(room.readyToStart)
      // setWinner(room.winner)
      // console.log(`[SocketManager] ${room.hostName}`)
      // setHostName(room.hostName)
      // setRoomId(room.id)
      // setThrown(room.thrown)
    })
    socket.on('client', (client) => {
      setClient(client);
    })
    socket.on('teams', (teams) => {
      setTeams(teams);
    })
    socket.on('gamePhase', (gamePhase) => {
      setGamePhase(gamePhase);
    })
    socket.on('readyToStart', (readyToStart) => {
      setReadyToStart(readyToStart);
    })
    socket.on('throwYoots', (yootForceVectors) => {
      setYootThrowValues(yootForceVectors);
      setThrown(true)
    })
    socket.on('legalTiles', ({ legalTiles }) => {
      setLegalTiles(legalTiles)
    })
    socket.on('select', (selection) => {
      setSelection(selection)
    })
    socket.on('tiles', (tiles) => {
      setTiles(tiles)
    })
    socket.on('winner', (winner) => {
      setWinner(winner)
    })
    socket.on('thrown', (thrown) => {
      setThrown(thrown)
    })
    socket.on('yell', (yell) => {
      setYell(yell)
    })
    /*socket.on('celebrate', (event) => {
      let text;
      if (event === 4) {
        text = 'yoot'
      } else if (event === 5) {
        text = 'mo'
      } else if (event === 'capture') {
        text = 'capture'
      }
      console.log(`[SocketManager] [celebrate] ${event}`)
      setCelebrateText(text)
      // setCelebrateMeteors(true)
      // setCelebrateText(text)
      if (!celebrateText) {
        setTimeout(() => {
          setCelebrateText(null)
        }, 5000)
      }
    })*/
    socket.on('disconnect', () => {
      console.log("[disconnect]")
      setDisconnect(true);
    })
  }, [])

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onJoinSpectator(gameState) {
      setClient(gameState.client);
      setGamePhase(gameState.gamePhase);
      setTurn(gameState.turn);
      setMessages(gameState.messages);
      setSelection(gameState.selection);
      setTiles(gameState.tiles);
    }
    // function onJoinTeam({client}) {
    //   setClient(client);
    //   localStorage.setItem('yootGame', JSON.stringify({
    //     gameId: 1,
    //     ...client
    //   }))
    // }
    function onJoinTeamLocalStorage({gameState}) {
      setClient(gameState.client);
      setGamePhase(gameState.gamePhase);
      setTurn(gameState.turn);
      setMessages(gameState.messages);
      setSelection(gameState.selection);
      setTiles(gameState.tiles);
      localStorage.setItem('yootGame', JSON.stringify({
        gameId: 1,
        ...gameState.client
      }))
    }
    function onSelect(value) {
      setSelection(value);
    }
    function onCharacters(value) {
      setCharacters(value);
    }
    function onTiles(value) {
      setTiles(value);
    }
    // function onTeams(value) {
    //   console.log("[onTeams] teams", value)
    //   setTeams(value);
    // }
    // function onYutThrow(yutForceVectors) {
    //   setYutThrowValues(yutForceVectors);
    // }
    function onReset({ tiles, selection, gamePhase, teams }) {
      setTiles(tiles);
      setSelection(selection);
      setGamePhase(gamePhase);
      setTeams(teams);
    }
    function onTurn(turn) {
      setTurn(turn);
    }
    function onGamePhase(gamePhase) {
      setGamePhase(gamePhase)
    }
    //UI events
    function onLegalTiles({ legalTiles }) {
      setLegalTiles(legalTiles)
    }
    // function onMessages(messages) {
    //   setMessages(messages)
    // }
    // socket.on("connect", onConnect);
    // socket.on("joinSpectator", onJoinSpectator)
    // socket.on("joinTeam", onJoinTeam)
    socket.on("joinTeamLocalStorage", onJoinTeamLocalStorage)
    // socket.on("disconnect", onDisconnect);
    socket.on("select", onSelect);
    socket.on("characters", onCharacters);
    socket.on("tiles", onTiles);
    // socket.on("teams", onTeams);
    // socket.on("throwYuts", onYutThrow);
    socket.on("reset", onReset);
    socket.on("turn", onTurn);
    socket.on("gamePhase", onGamePhase);
    socket.on("legalTiles", onLegalTiles);
    // socket.on("messages", onMessages);
    return () => {
      // socket.emit('disconnect');
      socket.off();
      // socket.off("connect", onConnect);
      // socket.off("joinSpectator", onJoinSpectator)
      // socket.off("joinTeam", onJoinTeam)
      socket.off("joinTeamLocalStorage", onJoinTeamLocalStorage)
      // socket.off("disconnect", onDisconnect);
      socket.off("select", onSelect);
      socket.off("characters", onCharacters);
      socket.off("tiles", onTiles);
      // socket.off("teams", onTeams);
      // socket.off("throwYuts", onYutThrow);
      socket.off("reset", onReset);
      socket.off("turn", onTurn);
      socket.off("gamePhase", onGamePhase);
      socket.off("legalTiles", onLegalTiles);
      // socket.off("messages", onMessages);
    };
  }, []);
};