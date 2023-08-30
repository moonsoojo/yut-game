import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";

export const socket = io("http://localhost:3000");
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
      console.log("[SocketManager][onSelect]");
      setSelection(value);
    }
    function onCharacters(value) {
      setCharacters(value);
    }
    function onPieces(value) {
      setPieces(value);
    }
    function onTiles(value) {
      console.log("[SocketManager][onTiles]");
      setTiles(value);
    }
    function onPlacePiece({ tiles, pieces }) {
      console.log("[SocketManager][onPlacePiece]", pieces);
      setTiles(tiles);
      setPieces(pieces);
    }
    function onFinishPiece({ tiles, pieces }) {
      setTiles(tiles);
      setPieces(pieces);
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
    };
  }, []);
};
