import { Html } from "@react-three/drei";
import { socket, messagesAtom } from "./SocketManager";
import { useAtom } from "jotai";
import React, { useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import { useParams } from "wouter";

export default function Chatbox({ height, width, padding, fontSize, device }) {
  const [messages] = useAtom(messagesAtom);
  const [message, setMessage] = useState('');
  const params = useParams();

  function onMessageSubmit (e) {
    e.preventDefault();
    socket.emit("sendMessage", { message, roomId: params.id }, ({ error }) => {
      if (error) {
        console.log(error)
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

  return <Html>
    
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
        <ScrollToBottom className="messages">
        {messages.map((value, index) => 
          <p style={{color: 'white', margin: 0}} key={index}>
            <span style={{color: getColorByTeam(value.team)}}>{value.user}: </span> 
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
  </Html>
}