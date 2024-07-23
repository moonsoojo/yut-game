import { Html } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { deviceAtom, gameLogsAtom } from './GlobalState';
import layout from './layout';
import { useAtom } from 'jotai';
import ScrollToBottom from 'react-scroll-to-bottom';

export default function GameLog({ position, rotation, scale }) {

  // instead of putting 'device' in 'Game', put it here
  const [device] = useAtom(deviceAtom)
  const [logs] = useAtom(gameLogsAtom)

  function formatMessage(log, index) {
    function moveToHtml(move) {
      if (move === 0) {
        return <span>an <span style={{ color: '#F1EE92' }}>out ({move})</span></span>
      } else if (move === 1) {
        return <span>a <span style={{ color: '#F1EE92' }}>do ({move})</span></span>
      } else if (move === 2) {
        return <span>a <span style={{ color: '#F1EE92' }}>ge ({move})</span></span>
      } else if (move === 3) {
        return <span>a <span style={{ color: '#F1EE92' }}>gul ({move})</span></span>
      } else if (move === 4) {
        return <span>a <span style={{ color: '#F1EE92' }}>yoot ({move})</span></span>
      } else if (move === 5) {
        return <span>a <span style={{ color: '#F1EE92' }}>mo ({move})</span></span>
      } else if (move === -1) {
        return <span>a <span style={{ color: '#F1EE92' }}>backdo ({move})</span></span>
      }
    }
    function piecesToHtml(team, numPieces) {
      // image of pieces
      if (team === 0) {
        if (numPieces === 1) {
          return <span style={{ color: '#FF3D1D' }}>
            {`a rocket `} 
            <img src='images/rocket.png' width='25px' height="25px"/>
          </span>
        } else if (numPieces === 2) {
          return <span style={{ color: '#FF3D1D' }}>
            {`two rockets `}
            <img src='images/rocket.png' width='25px' height="25px"/>
            <img src='images/rocket.png' width='25px' height="25px"/>
          </span>
        } else if (numPieces === 3) {
          return <span style={{ color: '#FF3D1D' }}>
            {`three rockets `}
            <img src='images/rocket.png' width='25px' height="25px"/>
            <img src='images/rocket.png' width='25px' height="25px"/>
            <img src='images/rocket.png' width='25px' height="25px"/>
          </span>
        } else if (numPieces === 4) {
          return <span style={{ color: '#FF3D1D' }}>
            {`the fleet `}
            <img src='images/rocket.png' width='25px' height="25px"/>
            <img src='images/rocket.png' width='25px' height="25px"/>
            <img src='images/rocket.png' width='25px' height="25px"/>
            <img src='images/rocket.png' width='25px' height="25px"/>
          </span>
        }
      } else if (team === 1) {
        if (numPieces === 1) {
          return <span style={{ color: '#88D8D0' }}>
            {`a UFO `}
            <img src='images/ufo.png' width='28px' height="25px"/>
          </span>
        } else if (numPieces === 2) {
          return <span style={{ color: '#88D8D0' }}>
            {`two UFOs `}
            <img src='images/ufo.png' width='28px' height="25px"/>
            <img src='images/ufo.png' width='28px' height="25px"/>
          </span>
        } else if (numPieces === 3) {
          return <span style={{ color: '#88D8D0' }}>
            {`three UFOs `}
            <img src='images/ufo.png' width='28px' height="25px"/>
            <img src='images/ufo.png' width='28px' height="25px"/>
            <img src='images/ufo.png' width='28px' height="25px"/>
          </span>
        } else if (numPieces === 4) {
          return <span style={{ color: '#88D8D0' }}>
            {`the fleet `}
            <img src='images/ufo.png' width='28px' height="25px"/>
            <img src='images/ufo.png' width='28px' height="25px"/>
            <img src='images/ufo.png' width='28px' height="25px"/>
            <img src='images/ufo.png' width='28px' height="25px"/>
          </span>
        }
      }
    }
    function tileToHtml(tile) {
      // image of tile
      if (tile === 0) { // earth
        return <></>
      } else if (tile === 1) { // star1
        return <span style={{ color: '#F1EE92' }}>star 1 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 2) { // star2
        return <span style={{ color: '#F1EE92' }}>star 2 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 3) { // star3
        return <span style={{ color: '#F1EE92' }}>star 3 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 4) { // star4
        return <span style={{ color: '#F1EE92' }}>star 4 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 5) { // mars
        return <></>
      } else if (tile === 6) { // star5
        return <span style={{ color: '#F1EE92' }}>star 5 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 7) { // star6
        return <span style={{ color: '#F1EE92' }}>star 6 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 8) { // star7
        return <span style={{ color: '#F1EE92' }}>star 7 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 9) { // star8
        return <span style={{ color: '#F1EE92' }}>star 8 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 10) { // saturn
        return <></>
      } else if (tile === 11) { // star9
        return <span style={{ color: '#F1EE92' }}>star 9 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 12) { // star10
        return <span style={{ color: '#F1EE92' }}>star 10 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 13) { // star11
        return <span style={{ color: '#F1EE92' }}>star 11 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 14) { // star12
        return <span style={{ color: '#F1EE92' }}>star 12 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 15) { // neptune
        return <></>
      } else if (tile === 16) {
        return <span style={{ color: '#F1EE92' }}>star 13 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 17) {
        return <span style={{ color: '#F1EE92' }}>star 14 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 18) { 
        return <span style={{ color: '#F1EE92' }}>star 15 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 19) { 
        return <span style={{ color: '#F1EE92' }}>star 16 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 20) { 
        return <span style={{ color: '#F1EE92' }}>star 17 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 21) {
        return <span style={{ color: '#F1EE92' }}>star 18 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 22) { // moon
        return <></>
      } else if (tile === 23) { 
        return <span style={{ color: '#F1EE92' }}>star 19 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 24) {
        return <span style={{ color: '#F1EE92' }}>star 20 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 25) { 
        return <span style={{ color: '#F1EE92' }}>star 21 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 26) { 
        return <span style={{ color: '#F1EE92' }}>star 22 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 27) {
        return <span style={{ color: '#F1EE92' }}>star 23 <img src='images/star.png' width='20px'/></span>
      } else if (tile === 28) {
        return <span style={{ color: '#F1EE92' }}>star 24 <img src='images/star.png' width='20px'/></span>
      }
    }
    if (log.logType === 'gameStart') {
      // content: text
      return <p style={{color: 'lightgreen', margin: 0, fontFamily: 'Luckiest Guy', padding: '3px' }} key={index}>
        {log.content.text}
      </p>
    } else if (log.logType === 'throw') {
      // content: playerName, team, move, bonus
      return <p style={{color: '#e0e0e0', margin: 0, fontFamily: 'Luckiest Guy', padding: '3px' }} key={index}>
        <span style={{color: log.content.team === 0 ? '#FF3D1D' : '#88D8D0'}}>
        {log.content.playerName}</span> threw {moveToHtml(log.content.move)} {log.content.bonus ? <span style={{ color: '#F1EE92' }}>{`(bonus throw)`}</span> : <></>}
      </p>
    } else if (log.logType === 'pregameResult') {
      // content: team
      if (log.content.team === -1) {
        return <p style={{color: 'lightgreen', margin: 0, fontFamily: 'Luckiest Guy', padding: '3px' }} key={index}>
          <span>Toss for order tied</span>
        </p>
      } else if (log.content.team === 0 || log.content.team === 1) {
        return <p style={{color: 'lightgreen', margin: 0, fontFamily: 'Luckiest Guy', padding: '3px' }} key={index}>
          <span style={{color: log.content.team === 0 ? '#FF3D1D' : '#88D8D0'}}>
          {log.content.team === 0 ? 'Rockets' : 'UFOs'}</span> go first
        </p>
      }
    } else if (log.logType === 'move') {
      // content: playerName, team, tile, numPieces, starting
      return <p style={{color: '#e0e0e0', margin: 0, fontFamily: 'Luckiest Guy', padding: '3px' }} key={index}>
        <span style={{color: log.content.team === 0 ? '#FF3D1D' : '#88D8D0'}}>
        {log.content.playerName}</span> {log.content.starting ? 'launched' : 'moved'} {piecesToHtml(log.content.team, log.content.numPieces)} to {tileToHtml(log.content.tile)}
      </p>
    } else if (log.logType === 'catch') {
      // content: playerName, team, caughtTeam, numPiecesCaught
      return <p style={{color: '#e0e0e0', margin: 0, fontFamily: 'Luckiest Guy', padding: '3px' }} key={index}>
        <span style={{color: log.content.team === 0 ? '#FF3D1D' : '#88D8D0'}}>
        {log.content.playerName}</span> kicked {piecesToHtml(log.content.caughtTeam, log.content.numPiecesCaught)} back home
      </p>
    } else if (log.logType === 'join') {
      // content: playerName, team, caughtTeam, numPiecesCaught
      return <p style={{color: '#e0e0e0', margin: 0, fontFamily: 'Luckiest Guy', padding: '3px' }} key={index}>
        <span style={{color: log.content.team === 0 ? '#FF3D1D' : '#88D8D0'}}>
        {log.content.playerName}</span> combined {piecesToHtml(log.content.team, log.content.numPiecesCombined)}
      </p>
    }
  }

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

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
        
        <ScrollToBottom className="game-logs">
          {logs.map((log, index) => formatMessage(log, index))}
          <div ref={messagesEndRef} />
        </ScrollToBottom>
      </div>
    </div>
  </Html>
}