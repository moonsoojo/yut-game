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
export const tilesAtom = atom(JSON.parse(JSON.stringify(initialState.tiles)))
export const initialYootThrowAtom = atom(true)
export const lastMoveAtom = atom(null)
export const hasTurnAtom = atom(false)
export const boomTextAtom = atom('')
export const displayMovesAtom = atom({})

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