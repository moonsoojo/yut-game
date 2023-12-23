import { socket, messagesAtom, clientAtom } from "./SocketManager";
import { useAtom } from "jotai";
import React, { useState, useRef, useEffect } from "react";

export default function Chatbox({ height, width, padding, fontSize }) {
  const [messages] = useAtom(messagesAtom);
  const [client] = useAtom(clientAtom);
  const [message, setMessage] = useState('');

  function onMessageSubmit (e) {
    e.preventDefault();
    socket.emit("sendMessage", { message, team: client.team })
    setMessage('')
  }
  
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // scrollToBottom();
  }, []); // must be a child component to scroll on load

  function getColorByTeam(team) {
    if (team == undefined) {
      return 'grey'
    } else if (team == 0) {
      return 'red'
    } else {
      return 'turquoise'
    }
  }

  return <>
    <div style={{
      'borderRadius': '5px',
      'height': height,
      'width': width,
      'padding': padding,
      'fontSize': fontSize,
      'background': 'rgba(128, 128, 128, 0.3)',
      'overflowY': 'auto',
      'wordWrap': 'break-word'
    }}>
      {messages.map((value, index) => 
        <p style={{color: 'white', margin: 0}} key={index}>
          <span style={{color: getColorByTeam(value.team)}}>{value.name}: </span> 
          {value.message}
        </p>
      )}
      <div ref={messagesEndRef} />
    </div>
    <form onSubmit={(e) => onMessageSubmit(e)}>
      <input 
        id='input-message'
        style={{ 
          height: '20px',
          borderRadius: '5px',
          padding: padding,
          border: 0,
          width: width,
        }} 
        onChange={e => setMessage(e.target.value)} 
        value={message}
        placeholder="say something..."
      />
    </form>
  </>
}