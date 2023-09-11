import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";

export const socket = io("http://192.168.86.158:3000");
export const throwVisibleFlagAtom = atom(false);
export const yutThrowValuesAtom = atom([
  {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  {
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    yImpulse: 0,
    torqueImpulse: {
      x: 0,
      y: 0,
      z: 0,
    },
    positionInHand: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
]);

export const selectionAtom = atom(null);
export const charactersAtom = atom([]);
export const piecesAtom = atom([
  [
    { tile: -1, team: 0, id: 0 },
    { tile: -1, team: 0, id: 1 },
    { tile: -1, team: 0, id: 2 },
    { tile: -1, team: 0, id: 3 },
  ],
  [
    { tile: -1, team: 1, id: 0 },
    { tile: -1, team: 1, id: 1 },
    { tile: -1, team: 1, id: 2 },
    { tile: -1, team: 1, id: 3 },
  ],
]);
export const tilesAtom = atom([
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
]);

export const SocketManager = () => {
  const [_selection, setSelection] = useAtom(selectionAtom);
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_tiles, setTiles] = useAtom(tilesAtom);
  const [_pieces, setPieces] = useAtom(piecesAtom);
  const [_yutThrowValues, setYutThrowValues] = useAtom(yutThrowValuesAtom);
  const [_throwVisibleFlag, setThrowVisibleFlag] =
    useAtom(throwVisibleFlagAtom);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onDisconnect() {
      console.log("connected");
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
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("select", onSelect);
    socket.on("characters", onCharacters);
    socket.on("tiles", onTiles);
    socket.on("pieces", onPieces);
    socket.on("placePiece", onPlacePiece);
    socket.on("finishPiece", onFinishPiece);
    socket.on("throwYuts", onYutThrow);
    socket.on("throwVisibleFlag", onThrowVisibleFlag);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("select", onSelect);
      socket.off("characters", onCharacters);
      socket.off("tiles", onTiles);
      socket.off("pieces", onPieces);
      socket.off("placePiece", onPlacePiece);
      socket.off("finishPiece", onFinishPiece);
      socket.off("yutThrow", onYutThrow);
      socket.off("throwVisibleFlag", onThrowVisibleFlag);
    };
  }, []);
};
