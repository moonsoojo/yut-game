import React from 'react';
import { useAtom, atom } from "jotai";
import layout from './layout';
import { team0PlayersAtom } from './SocketManager';

export default function Team0({ device }) {
    const [players] = useAtom(team0PlayersAtom)
    return <>
        {players.map((value, index) => (
            <div
                style={{
                    color: "yellow",
                    fontFamily: 'Luckiest Guy',
                    fontSize: '15px',
                    padding: layout[device].team0.names.padding
                }}
                key={index}
            >
                {value.name}
            </div>
        ))}
    </>
}