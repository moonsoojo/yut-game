import React from 'react';
import { useAtom, atom } from "jotai";
import layout from './layout';
import { team1PlayersAtom } from './SocketManager';

export default function Team1({ device }) {
    const [players] = useAtom(team1PlayersAtom)
    return <>
        {players.map((value, index) => (
            <div
                style={{
                    color: "yellow",
                    fontFamily: 'Luckiest Guy',
                    fontSize: '15px',
                    padding: layout[device].team1.names.padding
                }}
                key={index}
            >
                {value.name}
            </div>
        ))}
    </>
}