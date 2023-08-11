import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAtom, atom } from "jotai";

export const socket = io("http://localhost:3000");
export const selectionAtom = atom(null);
export const charactersAtom = atom([]);

export const SocketManager = () => {
  const [_selection, setSelection] = useAtom(selectionAtom);
  const [_characters, setCharacters] = useAtom(charactersAtom);
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

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("select", onSelect);
    socket.on("characters", onCharacters);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("select", onSelect);
      socket.off("characters", onCharacters);
    };
  }, []);
};
