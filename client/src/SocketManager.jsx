import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";
import initialState from "../../server/initialState";

export const socket = io("http://192.168.1.181:3000"); // http://192.168.1.181:3000 //http://192.168.86.158:3000
export const throwVisibleAtom = atom(false);
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
  const [_throwVisible, setThrowVisible] = useAtom(throwVisibleAtom);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
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
    function onPieces(value) {
      setPieces(value);
    }
    function onTiles(value) {
      setTiles(value);
    }
    function onTeams(value) {
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
    function onReset({ tiles, pieces, selection }) {
      setTiles(tiles);
      setPieces(pieces);
      setSelection(selection);
    }
    function onReadyToStart(flag) {
      setReadyToStart(flag);
    }
    function onTurn(turn) {
      setTurn(turn);
    }
    function onTakeTurn() {
      setThrowVisible(true);
    }
    function onThrowVisible(flag) {
      setThrowVisible(flag);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("select", onSelect);
    socket.on("characters", onCharacters);
    socket.on("tiles", onTiles);
    socket.on("pieces", onPieces);
    socket.on("teams", onTeams);
    socket.on("placePiece", onPlacePiece);
    socket.on("finishPiece", onFinishPiece);
    socket.on("throwYuts", onYutThrow);
    socket.on("throwVisible", onThrowVisible);
    socket.on("reset", onReset);
    socket.on("readyToStart", onReadyToStart);
    socket.on("turn", onTurn);
    socket.on("takeTurn", onTakeTurn);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("select", onSelect);
      socket.off("characters", onCharacters);
      socket.off("tiles", onTiles);
      socket.off("pieces", onPieces);
      socket.off("teams", onTeams);
      socket.off("placePiece", onPlacePiece);
      socket.off("finishPiece", onFinishPiece);
      socket.off("throwYuts", onYutThrow);
      socket.off("throwVisible", onThrowVisible);
      socket.off("reset", onReset);
      socket.off("readyToStart", onReadyToStart);
      socket.off("turn", onTurn);
      socket.off("takeTurn", onTakeTurn);
    };
  }, []);
};
