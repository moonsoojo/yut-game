import { Html } from '@react-three/drei';
import React from 'react';
import { deviceAtom, gameLogsAtom } from './GlobalState';
import layout from './layout';
import { useAtom } from 'jotai';

export default function GameLog({ position, rotation, scale }) {

  // instead of putting 'device' in 'Game', put it here
  const [device] = useAtom(deviceAtom)
  const [logs] = useAtom(gameLogsAtom)

  function formatMessage(log) {
    if (log.logType === 'gameStart') {
      return log.content.text
    }
  }

  // background
  // text
  // props: messages
  return <Html
    position={position}
    rotation={rotation}
    scale={scale}
    transform
  >
    <div style={{
      position: 'absolute'
    }}>
      <div style={{
        borderRadius: layout[device].game.chat.box.borderRadius,
        height: layout[device].game.chat.box.height,
        width: layout[device].game.chat.box.width,
        padding: layout[device].game.chat.box.padding,
        fontSize: layout[device].game.chat.box.fontSize,
        'background': 'rgba(128, 128, 128, 0.3)',
        'overflowY': 'auto',
        'wordWrap': 'break-word',
        'letter-spacing': '1.5px'
      }}>
        {logs.map((log, index) => 
          <p style={{color: '#B0B0B0', margin: 0, fontFamily: 'Luckiest Guy'}} key={index}>
            {formatMessage(log)}
          </p>
        )}
      </div>
    </div>
  </Html>
}