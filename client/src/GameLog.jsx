import { Html } from '@react-three/drei';
import React from 'react';
import { deviceAtom, gameLogsAtom } from './GlobalState';
import layout from './layout';
import { useAtom } from 'jotai';

export default function GameLog({ position, rotation, scale }) {

  // instead of putting 'device' in 'Game', put it here
  const [device] = useAtom(deviceAtom)
  const [logs] = useAtom(gameLogsAtom)

  function formatMessage(log, index) {
    function moveToHtml(move) {
      if (move === 0) {
        return <span>an <span style={{ color: 'yellow' }}>out ({move})</span></span>
      } else if (move === 1) {
        return <span>a <span style={{ color: 'yellow' }}>do ({move})</span></span>
      } else if (move === 2) {
        return <span>a <span style={{ color: 'yellow' }}>ge ({move})</span></span>
      } else if (move === 3) {
        return <span>a <span style={{ color: 'yellow' }}>gul ({move})</span></span>
      } else if (move === 4) {
        return <span>a <span style={{ color: 'yellow' }}>yoot ({move})</span></span>
      } else if (move === 5) {
        return <span>a <span style={{ color: 'yellow' }}>mo ({move})</span></span>
      } else if (move === -1) {
        return <span>a <span style={{ color: 'yellow' }}>backdo ({move})</span></span>
      }
    }
    if (log.logType === 'gameStart') {
      // content: text
      return <p style={{color: 'lightgreen', margin: 0, fontFamily: 'Luckiest Guy'}} key={index}>
        {log.content.text}
      </p>
    } else if (log.logType === 'throw') {
      // content: playerName, team, move
      return <p style={{color: '#e0e0e0', margin: 0, fontFamily: 'Luckiest Guy'}} key={index}>
        <span style={{color: log.content.team === 0 ? 'red' : 'turquoise'}}>
        {log.content.playerName}</span> threw {moveToHtml(log.content.move)}.
      </p>
    } else if (log.logType === 'pregameResult') {
      // content: team
      if (log.content.team === -1) {
        return <p style={{color: 'lightgreen', margin: 0, fontFamily: 'Luckiest Guy'}} key={index}>
          <span>Toss for order tied.</span>
        </p>
      } else if (log.content.team === 0 || log.content.team === 1) {
        return <p style={{color: 'lightgreen', margin: 0, fontFamily: 'Luckiest Guy'}} key={index}>
          <span style={{color: log.content.team === 0 ? 'red' : 'turquoise'}}>
          {log.content.team === 0 ? 'Rockets' : 'UFOs'}</span> go first.
        </p>
      }
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
        'letterSpacing': '1.5px'
      }}>
        {logs.map((log, index) => formatMessage(log, index))}
      </div>
    </div>
  </Html>
}