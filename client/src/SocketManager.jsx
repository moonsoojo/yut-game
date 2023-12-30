import { useEffect } from "react";
import { useAtom, atom } from "jotai";

import { io } from "socket.io-client";
import { useParams } from "wouter";

import initialState from "../../server/initialState"; 

const ENDPOINT = 'localhost:5000';

export const socket = io(
  ENDPOINT, { 
    query: {
      client: localStorage.getItem('yootGame')
    }
  }
); // http://192.168.1.181:3000 //http://192.168.86.158:3000
// export const socket = io("http://192.168.86.158:3000"); // http://192.168.1.181:3000 //http://192.168.86.158:3000
// doesn't work when another app is running on the same port
const initialYutRotations = JSON.parse(JSON.stringify(initialState.initialYutRotations))
const initialYutPositions = JSON.parse(JSON.stringify(initialState.initialYutPositions))

export const yutThrowValuesAtom = atom([
  {
    rotation: initialYutRotations[0],
    positionInHand: initialYutPositions[0],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: initialYutRotations[1],
    positionInHand: initialYutPositions[1],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: initialYutRotations[2],
    positionInHand: initialYutPositions[2],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: initialYutRotations[3],
    positionInHand: initialYutPositions[3],
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
]);

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
export const clientsAtom = atom({})
export const clientAtom = atom({})

export const SocketManager = () => {
  const [_selection, setSelection] = useAtom(selectionAtom);
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_tiles, setTiles] = useAtom(tilesAtom);
  const [_teams, setTeams] = useAtom(teamsAtom);
  const [_readyToStart, setReadyToStart] = useAtom(readyToStartAtom);
  const [_yutThrowValues, setYutThrowValues] = useAtom(yutThrowValuesAtom);
  const [_turn, setTurn] = useAtom(turnAtom);
  const [_gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  // UI updates
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom);
  const [_messages, setMessages] = useAtom(messagesAtom);
  const [_clients, setClients] = useAtom(clientsAtom);
  const [_client, setClient] = useAtom(clientAtom);

  const params = useParams();

  useEffect(() => {
    console.log("[SocketManager] socket", socket)

    socket.emit('joinRoom', { 
      room: params.id, 
      savedClient: localStorage.getItem('yootGame') 
    }, () => {})

    function onConnect() {
      console.log("connected");
    }
    function onClients(value) {
      setClients(value)
    }
    function onJoinSpectator(gameState) {
      console.log("gameState", gameState)
      setClient(gameState.client);
      setGamePhase(gameState.gamePhase);
      setTurn(gameState.turn);
      setMessages(gameState.messages);
      setSelection(gameState.selection);
      setTiles(gameState.tiles);
    }
    function onJoinTeam({client}) {
      setClient(client);
      localStorage.setItem('yootGame', JSON.stringify({
        gameId: 1,
        ...client
      }))
    }
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
    function onDisconnect() {
      console.log("disconnected");
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
    function onTeams(value) {
      console.log("[onTeams] teams", value)
      setTeams(value);
    }
    function onYutThrow(yutForceVectors) {
      setYutThrowValues(yutForceVectors);
    }
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
    function onMessages(messages) {
      setMessages(messages)
    }
    socket.on("connect", onConnect);
    socket.on("joinSpectator", onJoinSpectator)
    socket.on("joinTeam", onJoinTeam)
    socket.on("joinTeamLocalStorage", onJoinTeamLocalStorage)
    socket.on("clients", onClients)
    socket.on("disconnect", onDisconnect);
    socket.on("select", onSelect);
    socket.on("characters", onCharacters);
    socket.on("tiles", onTiles);
    socket.on("teams", onTeams);
    socket.on("throwYuts", onYutThrow);
    socket.on("reset", onReset);
    socket.on("readyToStart", onReadyToStart);
    socket.on("turn", onTurn);
    socket.on("gamePhase", onGamePhase);
    socket.on("legalTiles", onLegalTiles);
    socket.on("messages", onMessages);
    return () => {
      socket.emit('disconnect');
      socket.off();
      socket.off("connect", onConnect);
      socket.off("joinSpectator", onJoinSpectator)
      socket.off("joinTeam", onJoinTeam)
      socket.off("joinTeamLocalStorage", onJoinTeamLocalStorage)
      socket.off("clients", onClients)
      socket.off("disconnect", onDisconnect);
      socket.off("select", onSelect);
      socket.off("characters", onCharacters);
      socket.off("tiles", onTiles);
      socket.off("teams", onTeams);
      socket.off("throwYuts", onYutThrow);
      socket.off("reset", onReset);
      socket.off("readyToStart", onReadyToStart);
      socket.off("turn", onTurn);
      socket.off("gamePhase", onGamePhase);
      socket.off("legalTiles", onLegalTiles);
      socket.off("messages", onMessages);
    };
  }, [ENDPOINT, params]);
};