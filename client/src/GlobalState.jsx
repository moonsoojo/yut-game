import { atom } from "jotai";
import initialState from "../initialState";

export const joinTeamAtom = atom(null)
export const disconnectAtom = atom(false)
export const gamePhaseAtom = atom('lobby'); // lobby, pregame, game, winner
export const readyToStartAtom = atom(false);
export const currentPlayerAtom = atom(false)
export const turnAtom = atom(JSON.parse(JSON.stringify(initialState.turn)));
export const yootActiveAtom = atom(false);