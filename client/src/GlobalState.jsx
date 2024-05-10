import { atom } from "jotai";
import initialState from "../initialState";
import mediaValues from "./mediaValues";

export const joinTeamAtom = atom(null)
export const disconnectAtom = atom(false)
export const gamePhaseAtom = atom('lobby'); // lobby, pregame, game, winner
export const readyToStartAtom = atom(false);
export const currentPlayerAtom = atom(false)
export const turnAtom = atom(JSON.parse(JSON.stringify(initialState.turn)));
export const yootActiveAtom = atom(false);
export const spectatorsAtom = atom([])
export const clientAtom = atom({})
export const teamsAtom = atom(JSON.parse(JSON.stringify(initialState.teams)))
export const messagesAtom = atom([]);
export const roomAtom = atom({})
export const displayDisconnectAtom = atom(false)
export const hostNameAtom = atom('')
export const particleSettingAtom = atom(null)
export const yootThrowValuesAtom = atom(null)
export const yootThrownAtom = atom(false)
export const displayScoreOptionsAtom = atom(false)
export const selectionAtom = atom(null)
export const tilesAtom = atom(JSON.parse(JSON.stringify(initialState.initialTiles)))
export const initialYootThrowAtom = atom(true)
export const lastMoveAtom = atom(null)
export const hasTurnAtom = atom(false)
export const boomTextAtom = atom('')
export const displayMovesAtom = atom({})
export const legalTilesAtom = atom({})
export const pieceTeam0Id0Atom = atom(JSON.parse(JSON.stringify(initialState.teams[0].pieces[0])))
export const pieceTeam0Id1Atom = atom(JSON.parse(JSON.stringify(initialState.teams[0].pieces[1])))
export const pieceTeam0Id2Atom = atom(JSON.parse(JSON.stringify(initialState.teams[0].pieces[2])))
export const pieceTeam0Id3Atom = atom(JSON.parse(JSON.stringify(initialState.teams[0].pieces[3])))
export const pieceTeam1Id0Atom = atom(JSON.parse(JSON.stringify(initialState.teams[1].pieces[0])))
export const pieceTeam1Id1Atom = atom(JSON.parse(JSON.stringify(initialState.teams[1].pieces[1])))
export const pieceTeam1Id2Atom = atom(JSON.parse(JSON.stringify(initialState.teams[1].pieces[2])))
export const pieceTeam1Id3Atom = atom(JSON.parse(JSON.stringify(initialState.teams[1].pieces[3])))

// Set device
function initializeDevice(windowWidth, landscapeCutoff) {
  if (windowWidth < landscapeCutoff) {
    return "portrait"
  } else {
    return "landscapeDesktop"
  }
}
// window.innerWidth captured even though this component doesn't render anything visible
export const deviceAtom = atom(initializeDevice(window.innerWidth, mediaValues.landscapeCutoff))