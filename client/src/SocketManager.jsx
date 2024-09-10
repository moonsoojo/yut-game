import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";

import { io } from "socket.io-client";

import { 
  boomTextAtom, 
  pregameAlertAtom, 
  clientAtom, 
  disconnectAtom, displayMovesAtom, gamePhaseAtom, hasTurnAtom, helperTilesAtom, hostNameAtom, initialYootThrowAtom, legalTilesAtom, mainAlertAtom, messagesAtom, particleSettingAtom, pieceTeam0Id0Atom, pieceTeam0Id1Atom, pieceTeam0Id2Atom, pieceTeam0Id3Atom, pieceTeam1Id0Atom, pieceTeam1Id1Atom, pieceTeam1Id2Atom, pieceTeam1Id3Atom, readyToStartAtom, roomAtom, selectionAtom, spectatorsAtom, teamsAtom, tilesAtom, turnAtom, winnerAtom, yootActiveAtom, yootThrowValuesAtom, yootThrownAtom, moveResultAtom, throwResultAtom, throwAlertAtom, turnAlertActiveAtom, animationPlayingAtom, throwCountAtom, gameLogsAtom, yootAnimationAtom, 
  yootOutcomeAtom,
  currentPlayerNameAtom,
  alertsAtom,
  catchOutcomeAtom,
  pieceAnimationPlayingAtom} from "./GlobalState.jsx";
import { clientHasTurn } from "./helpers/helpers.js";

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
export const SocketManager = () => {
  const [client, setClient] = useAtom(clientAtom);
  const [teams, setTeams] = useAtom(teamsAtom)
  const [turn, setTurn] = useAtom(turnAtom);
  const [_room, setRoom] = useAtom(roomAtom);
  const [_messages, setMessages] = useAtom(messagesAtom);
  const [_gameLogs, setGameLogs] = useAtom(gameLogsAtom);
  const [_hostName, setHostName] = useAtom(hostNameAtom)
  const [_spectators, setSpectators] = useAtom(spectatorsAtom)
  const [_readyToStart, setReadyToStart] = useAtom(readyToStartAtom)
  const [_yootActive, setYootActive] = useAtom(yootActiveAtom)
  const [_disconnect, setDisconnect] = useAtom(disconnectAtom)
  const [_yootThrowValues, setYootThrowValues] = useAtom(yootThrowValuesAtom)
  const [_initialYootThrow, setInitialYootThrow] = useAtom(initialYootThrowAtom)
  const [_yootThrown, setYootThrown] = useAtom(yootThrownAtom)
  const [_hasTurn, setHasTurn] = useAtom(hasTurnAtom)
  const [_boomText, setBoomText] = useAtom(boomTextAtom)
  const [_mainAlert, setMainAlert] = useAtom(mainAlertAtom)
  const [_turnAlertActive, setTurnAlertActive] = useAtom(turnAlertActiveAtom)
  const [_moveResult, setMoveResult] = useAtom(moveResultAtom)
  const [_throwResult, setThrowResult] = useAtom(throwResultAtom)
  const [_pregameAlert, setPregameAlert] = useAtom(pregameAlertAtom)
  const [_throwAlert, setThrowAlert] = useAtom(throwAlertAtom)
  // Use state to check if the game phase changed
  const [gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [_displayMoves, setDisplayMoves] = useAtom(displayMovesAtom)
  const [_selection, setSelection] = useAtom(selectionAtom)
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom)
  const [_helperTiles, setHelperTiles] = useAtom(helperTilesAtom)
  const [_tiles, setTiles] = useAtom(tilesAtom)
  // Pieces on the board
  const [_pieceTeam0Id0, setPieceTeam0Id0] = useAtom(pieceTeam0Id0Atom)
  const [_pieceTeam0Id1, setPieceTeam0Id1] = useAtom(pieceTeam0Id1Atom)
  const [_pieceTeam0Id2, setPieceTeam0Id2] = useAtom(pieceTeam0Id2Atom)
  const [_pieceTeam0Id3, setPieceTeam0Id3] = useAtom(pieceTeam0Id3Atom)
  const [_pieceTeam1Id0, setPieceTeam1Id0] = useAtom(pieceTeam1Id0Atom)
  const [_pieceTeam1Id1, setPieceTeam1Id1] = useAtom(pieceTeam1Id1Atom)
  const [_pieceTeam1Id2, setPieceTeam1Id2] = useAtom(pieceTeam1Id2Atom)
  const [_pieceTeam1Id3, setPieceTeam1Id3] = useAtom(pieceTeam1Id3Atom)
  const [_throwCount, setThrowCount] = useAtom(throwCountAtom)
  const [_winner, setWinner] = useAtom(winnerAtom)
  // UI
  const [_particleSetting, setParticleSetting] = useAtom(particleSettingAtom)

  // animations
  const [_yootAnimation, setYootAnimation] = useAtom(yootAnimationAtom)
  const [_yootOutcome, setYootOutcome] = useAtom(yootOutcomeAtom)
  const [_currentPlayerName, setCurrentPlayerName] = useAtom(currentPlayerNameAtom)
  const [_alerts, setAlerts] = useAtom(alertsAtom)
  const [_catchOutcome, setCatchOutcome] = useAtom(catchOutcomeAtom)
  const [_animationPlaying, setAnimationPlaying] = useAtom(animationPlayingAtom)
  const [_pieceAnimationPlaying, setPieceAnimationPlaying] = useAtom(pieceAnimationPlayingAtom)


  useEffect(() => {

    console.log("[SocketManager] connect")

    socket.connect();

    socket.on('connect', () => {})
    
    socket.on('connect_error', err => { 
      console.log("[connect_error]", err); 
      setDisconnect(true) 
    })
    
    // socket.on('connect_failed', err => { console.log("[connect_failed]", err); setDisconnect(true) })

    socket.on('room', (room) => {
      console.log(`[SocketManager] room`, room)

      setMessages(room.messages)
      setTeams((prevTeams) => {
        // detect movement
        // so it runs in the same render as the setMainAlert
        const newTeams = room.teams
        for (let i = 0; i < 2; i++) {
          const prevPieces = prevTeams[i].pieces
          const newPieces = newTeams[i].pieces
          for (let j = 0; j < 4; j++) {
            if (prevPieces[j].tile !== newPieces[j].tile) {
              setAnimationPlaying(true)
            }
          }
        }
        
        // detect catch
        // so it runs in the same render as the setMainAlert
        for (let i = 0; i < 2; i++) {
          const enemyTeam = room.turn.team === 1 ? 0 : 1
          const prevPiecesEnemy = prevTeams[enemyTeam].pieces
          const newPiecesEnemy = newTeams[enemyTeam].pieces
          let numCaught = 0
          for (let j = 0; j < 4; j++) {
            if (prevPiecesEnemy[j].tile !== -1 && newPiecesEnemy[j].tile === -1) {
              numCaught++
            }
          }
          if (numCaught > 0) {
            setMainAlert({
              type: 'catch',
              team: room.turn.team,
              amount: numCaught,
              time: Date.now()
            })
          }
        }
        
        return newTeams
      })
      setSpectators(room.spectators)

      // nothing can be rendering MainAlert
      setPieceTeam0Id0(room.teams[0].pieces[0])
      setPieceTeam0Id1(room.teams[0].pieces[1])
      setPieceTeam0Id2(room.teams[0].pieces[2])
      setPieceTeam0Id3(room.teams[0].pieces[3])
      setPieceTeam1Id0(room.teams[1].pieces[0])
      setPieceTeam1Id1(room.teams[1].pieces[1])
      setPieceTeam1Id2(room.teams[1].pieces[2])
      setPieceTeam1Id3(room.teams[1].pieces[3])

      // Set host name for display
      if (room.host !== null) {
          setHostName(room.host.name)
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

      if (room.gamePhase === 'pregame' && room.yootThrown.player && !room.yootThrown.flag && (room.teams[0].pregameRoll === null) && (room.teams[1].pregameRoll === null)) {
        setPregameAlert({
          type: 'pregameTie'
        })
      }

      function makeTurnAlertObj(room) {
        const currentTeam = room.turn.team
        const currentPlayer = room.turn.players[currentTeam]
        if (!room.teams[currentTeam].players[currentPlayer]) {
          return { type: '' }
        } else {
          const alert = {
            type: 'turn',
            team: currentTeam,
            name: room.teams[currentTeam].players[currentPlayer].name
          }
          return alert
        }
      }

      setGamePhase((lastPhase) => {
        if (lastPhase === 'pregame' && room.gamePhase === 'game') {
        } else if (lastPhase === 'finished' && room.gamePhase === 'lobby') {
          // Reset fireworks from win screen
          setParticleSetting(null)
        }
        return room.gamePhase
      });

      const currentTeam = room.turn.team

      // Enable yoot button if client has the turn and his team 
      // has at least one throw and there is a player on the team
      // and the thrown flag is off
      if ((room.gamePhase === "pregame" || room.gamePhase === 'game') && (room.teams[currentTeam].players.length > 0 && 
      clientHasTurn(socket.id, room.teams, room.turn) &&
      room.teams[currentTeam].throws > 0 && !room.yootThrown.flag)) {
        setYootActive(true)
      } else {
        setYootActive(false)
      }

      setYootThrown(room.yootThrown)

      // Enable 'Let's play' button
      if (room.gamePhase === 'lobby' && 
      room.teams[0].players.length > 0 && 
      room.teams[1].players.length > 0) {
        setReadyToStart(true)
      } else {
        setReadyToStart(false)
      }

      setTurn((prevTurn) => {
        // if pregame result points turn to the same person
        // display alert with the same person's name
        const nextTurn = room.turn
        if (room.gamePhase !== 'lobby' && prevTurn.team !== nextTurn.team) {
          const turnAlert = makeTurnAlertObj(room)
          console.log('[setTurn] set main alert')
          setMainAlert(turnAlert)
        }
        return room.turn
      })

      if (room.gamePhase === 'game') {
        setDisplayMoves(room.teams[room.turn.team].moves)
      }

      if ((room.gamePhase === "pregame" || room.gamePhase === "game") && 
      clientHasTurn(socket.id, room.teams, room.turn)) {

        setHasTurn(true)

      } else {

        setHasTurn(false)

      }

      setSelection(room.selection)
      setLegalTiles(room.legalTiles)
      let helperTiles = {}
      let legalTiles = room.legalTiles
      let tiles = room.tiles
      let selection = room.selection

      // helper tiles
      for (const legalTile of Object.keys(legalTiles)) {
        console.log(`[SocketManager] legalTile`, legalTile)
        let moveInfo;
        if (legalTile !== '29') {
          moveInfo = legalTiles[legalTile]
          
          let helperProps = {
            move: parseInt(moveInfo.move)
          }

          // additional text
          if (tiles[legalTile].length === 0) { // if tile doesn't contain a piece
            helperProps.action = 'move'
          } else if (tiles[legalTile][0].team !== selection.pieces[0].team) {
            helperProps.action = 'catch'
          } else if (tiles[legalTile][0].team === selection.pieces[0].team) {
            helperProps.action = 'join'
          }
          helperTiles[legalTile] = helperProps
        }
      }

      setHelperTiles(helperTiles)

      setTiles(room.tiles)

      // result logic
      if (room.results.length === 0) {
        setWinner(-1)
      } else {
        setWinner(room.results[room.results.length-1])
      }

      if (room.gamePhase === 'pregame' || room.gamePhase === 'game') {
        const turn = room.turn
        setThrowCount(room.teams[turn.team].throws)
      }

      setGameLogs(room.gameLogs)

      console.log('[SocketManager] finished ingesting room state')

    })

    // hybrid: yoot thrown should not be set in room update.
    // it should only be updated on throw yoot (from the server).
    socket.on('throwYoot', ({ yootOutcome, yootAnimation, teams, turn }) => {
      setYootOutcome(yootOutcome)
      setYootAnimation(yootAnimation)
      setHasTurn(clientHasTurn(socket.id, teams, turn))
    })

    socket.on('gameStart', ({ teams, gamePhase, turn, gameLogs }) => {
      setTeams(teams) // only update the throw count of the current team
      setGamePhase(gamePhase)
      setTurn(turn)
      
      const currentPlayerName = teams[turn.team].players[turn.players[turn.team]].name
      setCurrentPlayerName(currentPlayerName)
      setAlerts(['gameStart', 'turn'])
      setAnimationPlaying(true)
      // in order to turn off yoot at start
      setHasTurn(clientHasTurn(socket.id, teams, turn))
      setGameLogs(gameLogs)
    })

    socket.on('recordThrow', ({ teams, gamePhaseUpdate, turn, pregameOutcome, yootOutcome, gameLogs }) => {      
      setTeams(teams) // only update the throw count of the current team
      setTurn(turn)
      // this invocation is within a useEffect
      // 'gamePhase' state is saved as the one loaded in component load because there's no dependency
      let gamePhasePrev;
      setGamePhase((prev) => {
        gamePhasePrev = prev;
        return gamePhaseUpdate
      })
      
      const currentPlayerName = teams[turn.team].players[turn.players[turn.team]].name
      setCurrentPlayerName(currentPlayerName)

      setYootOutcome(yootOutcome)
      
      if (gamePhaseUpdate === 'pregame') {
        let yootOutcomeAlertName;
        if (yootOutcome === 4 || yootOutcome === 5) {
          yootOutcomeAlertName = `yootOutcome${yootOutcome}Pregame`
        } else {
          yootOutcomeAlertName = `yootOutcome${yootOutcome}`
        }
        if (pregameOutcome === 'pass') {
          setAlerts([yootOutcomeAlertName, 'turn'])
        } else if (pregameOutcome === 'tie') {
          setAlerts([yootOutcomeAlertName, 'pregameTie', 'turn'])
        }
      } else if (gamePhasePrev === 'pregame' && gamePhaseUpdate === 'game') {
        let yootOutcomeAlertName;
        if (yootOutcome === 4 || yootOutcome === 5) {
          yootOutcomeAlertName = `yootOutcome${yootOutcome}Pregame`
        } else {
          yootOutcomeAlertName = `yootOutcome${yootOutcome}`
        }
        if (pregameOutcome === '0') { // changes from int to string
          setAlerts([yootOutcomeAlertName, 'pregameRocketsWin', 'turn'])
        } else if (pregameOutcome === '1') {
          setAlerts([yootOutcomeAlertName, 'pregameUfosWin', 'turn'])
        }
      } else if (gamePhaseUpdate === 'game') {
        let yootOutcomeAlertName = `yootOutcome${yootOutcome}`
        if (yootOutcome === 0) {
          setAlerts([yootOutcomeAlertName, 'turn'])
        } else {
          setAlerts([yootOutcomeAlertName])
        }
      }

      setAnimationPlaying(true)
      setHasTurn(clientHasTurn(socket.id, teams, turn))
      setGameLogs(gameLogs)
    })

    function calculateNumPiecesCaught(piecesPrev, piecesUpdate) {
      let numPiecesCaught = 0;
      for (let i = 0; i < 4; i++) {
        if (piecesUpdate[i].tile === -1 && piecesPrev[i].tile !== -1) {
          numPiecesCaught++;
        }
      }
      return numPiecesCaught;
    }

    socket.on("move", ({ teamsUpdate, turnUpdate, legalTiles, tiles, gameLogs, selection }) => {
      console.log(`[SocketManager][move]`)
      let teamsPrev;
      setTeams((prev) => {
        teamsPrev = prev;
        return teamsUpdate
      }) // only update the throw count of the current team
      let turnPrev;
      setTurn((prev) => {
        turnPrev = prev;
        return turnUpdate
      })
      
      const currentPlayerName = teamsUpdate[turnUpdate.team].players[turnUpdate.players[turnUpdate.team]].name
      setCurrentPlayerName(currentPlayerName)
      
      if (turnPrev.team !== turnUpdate.team) {
        setAlerts(['turn'])
      } else {
        const opposingTeam = turnUpdate.team === 0 ? 1 : 0;
        const opposingTeamPiecesPrev = teamsPrev[opposingTeam].pieces;
        const opposingTeamPiecesUpdate = teamsUpdate[opposingTeam].pieces
        let numPiecesCaught = calculateNumPiecesCaught(opposingTeamPiecesPrev, opposingTeamPiecesUpdate)
        console.log(`[SocketManager][move] numPiecesCaught`, numPiecesCaught)
        if (numPiecesCaught > 0) {
          console.log(`[SocketManager][move] catch`)
          setAlerts([`catch`])
          setCatchOutcome({
            numPieces: numPiecesCaught,
            teamCaught: opposingTeam
          })
        } else {
          console.log(`[SocketManager][move] regular move, still didn't change turn`)
          setAlerts([])
        }
      }

      setAnimationPlaying(true)
      setPieceAnimationPlaying(true)
      // whenever turn could have changed
      setHasTurn(clientHasTurn(socket.id, teamsUpdate, turnUpdate))
      setLegalTiles(legalTiles)
      setTiles(tiles)
      setPieceTeam0Id0(teamsUpdate[0].pieces[0])
      setPieceTeam0Id1(teamsUpdate[0].pieces[1])
      setPieceTeam0Id2(teamsUpdate[0].pieces[2])
      setPieceTeam0Id3(teamsUpdate[0].pieces[3])
      setPieceTeam1Id0(teamsUpdate[1].pieces[0])
      setPieceTeam1Id1(teamsUpdate[1].pieces[1])
      setPieceTeam1Id2(teamsUpdate[1].pieces[2])
      setPieceTeam1Id3(teamsUpdate[1].pieces[3])
      setSelection(selection)
      setGameLogs(gameLogs)
    })

    socket.on("score", ({ teams, turnUpdate, legalTiles, tiles, gameLogs, selection, gamePhase, results }) => {
      setTeams(teams)
      let turnPrev;
      setTurn((prev) => {
        turnPrev = prev;
        return turnUpdate
      })
      
      const currentPlayerName = teams[turnUpdate.team].players[turnUpdate.players[turnUpdate.team]].name
      setCurrentPlayerName(currentPlayerName)
      
      if (turnPrev.team !== turnUpdate.team) {
        setAlerts(['turn'])
        setAnimationPlaying(true)
      } else {
        setAlerts([])
      }

      setPieceAnimationPlaying(true)
      // whenever turn could have changed
      setHasTurn(clientHasTurn(socket.id, teams, turnUpdate))
      setLegalTiles(legalTiles)
      setTiles(tiles)
      setPieceTeam0Id0(teams[0].pieces[0])
      setPieceTeam0Id1(teams[0].pieces[1])
      setPieceTeam0Id2(teams[0].pieces[2])
      setPieceTeam0Id3(teams[0].pieces[3])
      setPieceTeam1Id0(teams[1].pieces[0])
      setPieceTeam1Id1(teams[1].pieces[1])
      setPieceTeam1Id2(teams[1].pieces[2])
      setPieceTeam1Id3(teams[1].pieces[3])
      setSelection(selection)
      setGameLogs(gameLogs)
      setGamePhase(gamePhase)
      setWinner(results[results.length-1])
    })

    socket.on('select', ({ selection, legalTiles }) => { //receive
   
      // handle
      setSelection(selection)
      setLegalTiles(legalTiles)
    })

    socket.on('disconnect', () => {
      console.log("[disconnect]")
      setDisconnect(true);
    })

    return () => {
      socket.disconnect()

      socket.off();
    }
  }, [])

};