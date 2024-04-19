import { useEffect } from "react";
import { useAtom, atom } from "jotai";

import { io } from "socket.io-client";
import { useParams } from "wouter";

import initialState from "../initialState.js"; 
import { currentPlayerAtom, disconnectAtom, readyToStartAtom, turnAtom, yootActiveAtom } from "./GlobalState.jsx";

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
export const gamePhaseAtom = atom("lobby");
export const displayScoreOptionsAtom = atom(false);
export const legalTilesAtom = atom({});
export const messagesAtom = atom([]);
export const nameAtom = atom('');
export const roomAtom = atom({})
export const winnerAtom = atom(null)
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
export const clientAtom = atom({})
export const team0PlayersAtom = atom([])
export const team1PlayersAtom = atom([])
export const spectatorsAtom = atom([])

export const SocketManager = () => {
  const [_selection, setSelection] = useAtom(selectionAtom);
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_tiles, setTiles] = useAtom(tilesAtom);
  const [_yootThrowValues, setYootThrowValues] = useAtom(yootThrowValuesAtom);
  const [turn, setTurn] = useAtom(turnAtom);
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
  const [_thrown, setThrown] = useAtom(thrownAtom)
  const [_boomText, setBoomText] = useAtom(boomTextAtom);

  // new setters
  const [client, setClient] = useAtom(clientAtom);
  const [teams, setTeams] = useAtom(teamsAtom)
  const [_team0Players, setTeam0Players] = useAtom(team0PlayersAtom)
  const [_team1Players, setTeam1Players] = useAtom(team1PlayersAtom)
  const [_spectators, setSpectators] = useAtom(spectatorsAtom)
  const [readyToStart, setReadyToStart] = useAtom(readyToStartAtom)
  const [gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [currentPlayer, setCurrentPlayer] = useAtom(currentPlayerAtom)
  const [yootActive, setYootActive] = useAtom(yootActiveAtom)
  const params = useParams();

  useEffect(() => {

    console.log("[SocketManager] connect")

    socket.connect();

    socket.on('connect', () => {})

    socket.on('client', (data) => {
      console.log(`[SocketManager] client`, data)
      setClient(data)
    })

    socket.on('room', (data) => {
      console.log(`[SocketManager] room`, data)
      setRoom(data)
    })

    socket.on('connect_error', err => { 
      console.log("[connect_error]", err); 
      setDisconnect(true) 
    })
    // socket.on('connect_failed', err => { console.log("[connect_failed]", err); setDisconnect(true) })

    return () => {
      socket.disconnect()

      socket.off();
    }
  }, []);

  useEffect(() => {
    socket.on('room', (room) => {
      console.log(`[SocketManager] room`, room)
      setMessages(room.messages)
      setTeams(room.teams)
      setSpectators(room.spectators)
      if (room.host !== null) {
        if (room.host.socketId === socket.id) {
          setHostName('you')
        } else {
          setHostName(room.host.name)
        }
      }

      // Find client from users
      let users = room.teams[0].players.concat(room.teams[1].players.concat(room.spectators))
      for (const user of users) {
        if (user.socketId === socket.id) {
          setClient(user)
          localStorage.setItem('yootGame', JSON.stringify({
            ...user
          }))
        }
      }

      setGamePhase(room.gamePhase);

      if (room.gamePhase === 'lobby' && 
      room.teams[0].players.length > 0 && 
      room.teams[1].players.length > 0 &&
      room.host.socketId === socket.id) {
        setReadyToStart(true)
      } else {
        setReadyToStart(false)
      }

      setTurn(room.turn)

      // setTeams(room.teams);
      // setTiles(room.tiles);
      // setTurn(room.turn);
      // setLegalTiles(room.legalTiles);
      // setSelection(room.selection);
      // setWinner(room.winner)
      // console.log(`[SocketManager] ${room.hostName}`)
      // setRoomId(room.id)
      // setThrown(room.thrown)
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

  // updating on teams change might cause issues
  // if players leave and player index from turn
  // is out of range
  useEffect(() => {
    console.log(`[SocketManager] turn`, turn)
    const currentTeam = turn.team
    const currentPlayer = turn.players[turn.team]
    if (teams[currentTeam].players.length > 0 && 
      teams[currentTeam].players[currentPlayer].socketId === client.socketId &&
      teams[currentTeam].throws > 0
    ) {
      setYootActive(true)
    } else {
      setYootActive(false)
    }
  }, [client, turn])

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