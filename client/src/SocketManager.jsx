import { useEffect } from "react";
import { useAtom, atom } from "jotai";

import { io } from "socket.io-client";
import { useParams } from "wouter";

import initialState from "../initialState.js"; 

// const ENDPOINT = 'localhost:5000';

const ENDPOINT = 'https://yoot-game-6c96a9884664.herokuapp.com/';

export const socket = io(
  ENDPOINT, { 
    query: {
      client: localStorage.getItem('yootGame')
    },
    autoConnect: false,
  },
)

// export const socket = io("http://192.168.86.158:3000"); // http://192.168.1.181:3000
// doesn't work when another app is running on the same port

// game state
export const selectionAtom = atom(null);
export const tilesAtom = atom(JSON.parse(JSON.stringify(initialState.tiles)));
export const teamsAtom = atom(JSON.parse(JSON.stringify(initialState.teams)));
export const turnAtom = atom(JSON.parse(JSON.stringify(initialState.turn)));
export const gamePhaseAtom = atom("lobby");
export const readyToStartAtom = atom(false);
export const legalTilesAtom = atom({});
export const readyToThrowAtom = atom(false)
export const messagesAtom = atom([]);
export const displayScoreOptionsAtom = atom(false);
export const yootThrowValuesAtom = atom(null)
export const clientAtom = atom({}) // team, name, socketId

// room information
export const hostIdAtom = atom("")

// server-client connection
export const disconnectAtom = atom(false)
export const displayDisconnectAtom = atom(false)

export const SocketManager = () => {
  // game state
  const [_selection, setSelection] = useAtom(selectionAtom);
  const [_tiles, setTiles] = useAtom(tilesAtom);
  const [_teams, setTeams] = useAtom(teamsAtom);
  const [_turn, setTurn] = useAtom(turnAtom);
  const [_gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [_readyToStart, setReadyToStart] = useAtom(readyToStartAtom);
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom);
  const [_readyToThrow, setReadyToThrow] = useAtom(readyToThrowAtom)
  const [messages, setMessages] = useAtom(messagesAtom);
  const [_yootThrowValues, setYootThrowValues] = useAtom(yootThrowValuesAtom);
  // either spectator or player
  const [_client, setClient] = useAtom(clientAtom); // team, name, socketId

  // room info
  const [_hostId, setHostId] = useAtom(hostIdAtom);

  // server-client connection
  const [_disconnect, setDisconnect] = useAtom(disconnectAtom)
  const [displayDisconnect] = useAtom(displayDisconnectAtom)

  const params = useParams();

  useEffect(() => {

    if (!displayDisconnect) {

      socket.connect();

      socket.on('connect', () => { setDisconnect(false) })
      socket.on('connect_error', (err) => { setDisconnect(true) })
  
      socket.emit("createRoom", { id: params.id }, () => {
        socket.emit('joinRoom', { 
          id: roomId, 
          savedClient: localStorage.getItem('yootGame') 
        }, ({ error }) => {
          if (error) {
            setDisconnect(true)
          }
        })
      })

      socket.on('room', (room) => {
        setTeams(room.teams);
        setGamePhase(room.gamePhase);
        setTiles(room.tiles);
        setTurn(room.turn);
        setLegalTiles(room.legalTiles);
        setSelection(room.selection);
        setReadyToThrow(room.readyToThrow)
        setHostId(room.hostId)
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
  
      return () => {
        socket.disconnect()
  
        socket.off();
      }
    }
  }, []);

  // without the dependency, it only shows the last message
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages])

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