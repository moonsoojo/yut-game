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
const initialYootRotations = JSON.parse(JSON.stringify(initialState.initialYootRotations))
const initialYootPositions = JSON.parse(JSON.stringify(initialState.initialYootPositions))

export const yootThrowValuesAtom = atom(null)
/*export const yootThrowValuesAtom = atom([
  {
    rotation: initialYootRotations[0],
    positionInHand: initialYootPositions[0],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: initialYootRotations[1],
    positionInHand: initialYootPositions[1],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: initialYootRotations[2],
    positionInHand: initialYootPositions[2],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: initialYootRotations[3],
    positionInHand: initialYootPositions[3],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
]);*/

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
export const clientAtom = atom({})
export const roomAtom = atom({})
export const readyToThrowAtom = atom(false)
export const disconnectAtom = atom(false)

export const SocketManager = () => {
  const [_selection, setSelection] = useAtom(selectionAtom);
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_tiles, setTiles] = useAtom(tilesAtom);
  const [teams, setTeams] = useAtom(teamsAtom);
  const [_readyToStart, setReadyToStart] = useAtom(readyToStartAtom);
  const [_yootThrowValues, setYootThrowValues] = useAtom(yootThrowValuesAtom);
  const [_turn, setTurn] = useAtom(turnAtom);
  const [_gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  // UI updates
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [_client, setClient] = useAtom(clientAtom);
  const [room, setRoom] = useAtom(roomAtom);
  const [_readyToThrow, setReadyToThrow] = useAtom(readyToThrowAtom)
  const [_disconnect, setDisconnect] = useAtom(disconnectAtom)

  const params = useParams();

  useEffect(() => {

    socket.connect();

    socket.on('connect', () => { console.log("[connect]"); setDisconnect(false) })
    socket.on('connect_error', err => { console.log("[connect_error]", err); setDisconnect(true) })
    // socket.on('connect_failed', err => { console.log("[connect_failed]", err); setDisconnect(true) })

    socket.emit("createRoom", { id: params.id }, ({ roomId, error }) => {
      console.log("[SocketManager] roomId", roomId)
      if (error) {
        console.log('error in creating room', roomId, error)
      }

      socket.emit('joinRoom', { 
        id: roomId, 
        savedClient: localStorage.getItem('yootGame') 
      }, (response) => {
        console.log("[joinRoom callback]", response)
      })
    })

    return () => {
      socket.disconnect()

      socket.off();
    }
  }, []);

  // without the dependency, it only shows the last message
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages])

  useEffect(() => {
    socket.on('room', (room) => {
      console.log("[SocketManager] room.teams", room.teams)
      setTeams(room.teams);
      setGamePhase(room.gamePhase);
      setTiles(room.tiles);
      setTurn(room.turn);
      setLegalTiles(room.legalTiles);
      setSelection(room.selection);
      setReadyToThrow(room.readyToThrow)
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
    socket.on('readyToThrow', (readyToThrow) => {
      setReadyToThrow(readyToThrow);
    })
    socket.on('throwYoots', (yootForceVectors) => {
      setYootThrowValues(yootForceVectors);
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
    function onReadyToStart(flag) {
      setReadyToStart(flag);
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
    socket.on("readyToStart", onReadyToStart);
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
      socket.off("readyToStart", onReadyToStart);
      socket.off("turn", onTurn);
      socket.off("gamePhase", onGamePhase);
      socket.off("legalTiles", onLegalTiles);
      // socket.off("messages", onMessages);
    };
  }, []);
};