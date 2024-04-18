import { atom } from "jotai";

export const joinTeamAtom = atom(null)
export const disconnectAtom = atom(false)
export const gamePhaseAtom = atom('pregame'); // lobby, pregame, game, winner
