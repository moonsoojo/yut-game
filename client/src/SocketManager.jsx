import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";
import initialState from "../../server/initialState";

export const socket = io("http://192.168.1.181:3000"); // http://192.168.1.181:3000
export const throwVisibleFlagAtom = atom(false);
export const yutThrowValuesAtom = atom([
  {
    rotation: { x: 0, y: 0, z: 0, w: 0 },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: -6,
      y: 1.9,
      z: -1,
    },
  },
  {
    rotation: { x: 0, y: 0, z: 0, w: 0 },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: -6,
      y: 2.5,
      z: -0.3,
    },
  },
  {
    rotation: { x: 0, y: 0, z: 0, w: 0 },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: -6,
      y: 2,
      z: 0.4,
    },
  },
  {
    rotation: { x: 0, y: 0, z: 0, w: 0 },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: -6,
      y: 4,
      z: 1,
    },
  },
]);
export const selectionAtom = atom(null);
export const charactersAtom = atom([]);
export const piecesAtom = atom(JSON.parse(JSON.stringify(initialState.pieces)));
export const tilesAtom = atom(JSON.parse(JSON.stringify(initialState.tiles)));
export const teamsAtom = atom(JSON.parse(JSON.stringify(initialState.teams)));
export const turnAtom = atom(JSON.parse(JSON.stringify(initialState.turn)));
export const readyToStartAtom = atom(false);

export const SocketManager = () => {
  const [_selection, setSelection] = useAtom(selectionAtom);
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_tiles, setTiles] = useAtom(tilesAtom);
  const [_pieces, setPieces] = useAtom(piecesAtom);
  const [_teams, setTeams] = useAtom(teamsAtom);
  const [_readyToStart, setReadyToStart] = useAtom(readyToStartAtom);
  const [_yutThrowValues, setYutThrowValues] = useAtom(yutThrowValuesAtom);
  const [_turn, setTurn] = useAtom(turnAtom);
  const [_throwVisibleFlag, setThrowVisibleFlag] =
    useAtom(throwVisibleFlagAtom);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onDisconnect() {
      console.log("disconnected");
    }
    function onHello() {
      console.log("hello");
    }
    function onSelect(value) {
      setSelection(value);
    }
    function onCharacters(value) {
      setCharacters(value);
    }
    function onPieces(value) {
      setPieces(value);
    }
    function onTiles(value) {
      setTiles(value);
    }
    function onTeams(value) {
      console.log("[SocketManager][onTeams]", value)
      setTeams(value);
    }
    function onPlacePiece({ tiles, pieces }) {
      setTiles(tiles);
      setPieces(pieces);
    }
    function onFinishPiece({ tiles, pieces }) {
      setTiles(tiles);
      setPieces(pieces);
    }
    function onYutThrow(yutForceVectors) {
      setYutThrowValues(yutForceVectors);
    }
    function onThrowVisibleFlag(flag) {
      setThrowVisibleFlag(flag);
    }
    function onReset({ tiles, pieces, selection }) {
      setTiles(tiles);
      setPieces(pieces);
      setSelection(selection);
    }
    function onReadyToStart() {
      console.log("[SocketManager][onReadyToStart]")
      setReadyToStart(true)
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("select", onSelect);
    socket.on("characters", onCharacters);
    socket.on("tiles", onTiles);
    socket.on("pieces", onPieces);
    socket.on("teams", onTeams);
    socket.on("placePiece", onPlacePiece);
    socket.on("finishPiece", onFinishPiece);
    socket.on("throwYuts", onYutThrow);
    socket.on("throwVisibleFlag", onThrowVisibleFlag);
    socket.on("reset", onReset);
    socket.on("readyToStart", onReadyToStart);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("select", onSelect);
      socket.off("characters", onCharacters);
      socket.off("tiles", onTiles);
      socket.off("pieces", onPieces);
      socket.off("teams", onTeams);
      socket.off("placePiece", onPlacePiece);
      socket.off("finishPiece", onFinishPiece);
      socket.off("yutThrow", onYutThrow);
      socket.off("reset", onReset);
      socket.off("readyToStart", onReadyToStart);
    };
  }, []);
};
