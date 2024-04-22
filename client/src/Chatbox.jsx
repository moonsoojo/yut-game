import { Html, Scroll } from "@react-three/drei";
import { socket } from "./SocketManager";
import { useAtom } from "jotai";
import React, { useState, useRef, useEffect } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import { useParams } from "wouter";
import layout from "./layout";
import { messagesAtom } from "./GlobalState"

export default function Chatbox({ position=[0,0,0], rotation=[0,0,0], scale=1, device }) {
  const [messages] = useAtom(messagesAtom);
  const [message, setMessage] = useState('');
  const params = useParams();

  function onMessageSubmit (e) {
    e.preventDefault();
    socket.emit("sendMessage", { message, roomId: params.id }, ({ joinRoomId, error }) => {
      if (error) {
        console.log('[sendMessage] error sending message to room', joinRoomId)
      } else {
        setMessage('')
      }
    })
  }
  
  // const messagesEndRef = useRef(null);
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // };

  // useEffect(() => {
  //   // scrollToBottom();
  // }, [messages]);

  // useEffect(() => {
  //   // scrollToBottom();
  // }, []); // must be a child component to scroll on load
  // must be disabled, or it will disappear when a new blender-created
  // mesh is loaded

  function getColorByTeam(team) {
    if (team == undefined) {
      return 'grey'
    } else if (team == 0) {
      return 'red'
    } else {
      return 'turquoise'
    }
  }

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
        borderRadius: layout[device].chat.box.borderRadius,
        height: layout[device].chat.box.height,
        width: layout[device].chat.box.width,
        padding: layout[device].chat.box.padding,
        fontSize: layout[device].chat.box.fontSize,
        'background': 'rgba(128, 128, 128, 0.3)',
        'overflowY': 'auto',
        'wordWrap': 'break-word',
      }}>
        <ScrollToBottom className="messages">
        {messages.map((value, index) => 
          <p style={{color: 'white', margin: 0}} key={index}>
            <span style={{color: getColorByTeam(value.team)}}>{value.name}: </span> 
            {value.text}
          </p>
        )}
        {/* <div ref={messagesEndRef} /> */}
        </ScrollToBottom>
      </div>
      <form onSubmit={(e) => onMessageSubmit(e)}>
        <input 
          id='input-message'
          style={{ 
            height: layout[device].chat.input.height,
            borderRadius: layout[device].chat.input.borderRadius,
            padding: layout[device].chat.input.padding,
            border: layout[device].chat.input.border,
            width: layout[device].chat.box.width,
            fontSize: layout[device].chat.input.fontSize
          }} 
          onChange={e => setMessage(e.target.value)} 
          value={message}
          placeholder="say something..."
        />
      </form>
    </div>
  </Html>
}