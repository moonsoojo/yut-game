import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";
import initialState from "../../server/initialState";

export const socket = io("http://192.168.86.158:3000"); // http://192.168.1.181:3000 //http://192.168.86.158:3000
// doesn't work when another app is running on the same port

export const yutThrowValuesAtom = atom([
  {
    rotation: { x: 0, y: 1, z: 0, w: 1 },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: -1,
      y: 1,
      z: 0,
    },
  },
  {
    rotation: { x: 0, y: 1, z: 0, w: 1 },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: -0.4,
      y: 1,
      z: 0,
    },
  },
  {
    rotation: { x: 0, y: 1, z: 0, w: 1 },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: 0.2,
      y: 1,
      z: 0,
    },
  },
  {
    rotation: { x: 0, y: 1, z: 0, w: 1 },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: 0.8,
      y: 1,
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
// info about player
export const clientTeamAtom = atom(-1);
export const socketIdAtom = atom("");
// client UI display
export const displayScoreOptionsAtom = atom(false);
export const throwInProgressAtom = atom(false)
export const legalTilesAtom = atom({});

export const SocketManager = () => {
  const [_selection, setSelection] = useAtom(selectionAtom);
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_tiles, setTiles] = useAtom(tilesAtom);
  const [_teams, setTeams] = useAtom(teamsAtom);
  const [_readyToStart, setReadyToStart] = useAtom(readyToStartAtom);
  const [_yutThrowValues, setYutThrowValues] = useAtom(yutThrowValuesAtom);
  const [_turn, setTurn] = useAtom(turnAtom);
  const [_gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [_throwInProgress, setThrowInProgress] = useAtom(throwInProgressAtom)
  // info about player
  const [_clientTeam, setClientTeam] = useAtom(clientTeamAtom)
  const [_socketId, setSocketId] = useAtom(socketIdAtom);
  // UI updates
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onSetUpPlayer({socketId, team}) {
      setClientTeam(team);
      setSocketId(socketId);
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
      setTeams(value);
    }
    function onYutThrow(yutForceVectors) {
      setYutThrowValues(yutForceVectors);
    }
    function onReset({ tiles, selection, gamePhase }) {
      setTiles(tiles);
      setSelection(selection);
      setReadyToStart(false);
      setGamePhase(gamePhase)
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
    function onThrowInProgress(flag) {
      setThrowInProgress(flag)
    }
    function onLegalTiles({ legalTiles }) {
      setLegalTiles(legalTiles)
    }

    socket.on("connect", onConnect);
    socket.on("setUpPlayer", onSetUpPlayer)
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
    socket.on("throwInProgress", onThrowInProgress);
    socket.on("legalTiles", onLegalTiles);
    return () => {
      socket.off("connect", onConnect);
      socket.off("setUpPlayer", onSetUpPlayer)
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
      socket.off("throwInProgress", onThrowInProgress);
      socket.off("legalTiles", onLegalTiles);
    };
  }, []);
};
