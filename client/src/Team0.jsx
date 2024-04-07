import React from 'react';
import { useAtom, atom } from "jotai";
import layout from './layout';

export default function Team0() {
    const [users] = useAtom(usersAtom)
    let players = []
    for (let id in users) {
        if (users[id].team === 0) {
            players.push(users[id])
        }
    }
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