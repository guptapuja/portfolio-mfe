import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
console.log("Connecting to:", import.meta.env.VITE_SOCKET_URL);
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3003';
const socket = io(SOCKET_URL);

const ChatWidget = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatLog]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatLog((prev) => [...prev, { ...data, time: timestamp }]);
    });
    return () => socket.off('receive_message');
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit('send_message', { text: message, user: 'Puja' });
      setMessage("");
    }
  };

  const styles = {
    container: {
      width: '400px', height: '500px', background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.3)'
    },
    header: {
      padding: '20px', background: 'linear-gradient(135deg, #646cff, #7b81ff)', color: 'white',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    },
    log: { flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' },
    bubble: (isMe) => ({
      alignSelf: isMe ? 'flex-end' : 'flex-start',
      background: isMe ? '#646cff' : '#f0f0f0',
      color: isMe ? 'white' : '#333',
      padding: '10px 16px', borderRadius: isMe ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
      maxWidth: '80%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '0.9rem'
    }),
    inputArea: { padding: '15px', display: 'flex', gap: '10px', background: 'white', borderTop: '1px solid #eee' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={{ fontWeight: 'bold' }}>💬 AI Support Agent</span>
        <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }}></div>
      </div>
      <div style={styles.log} ref={scrollRef}>
        {chatLog.map((msg, i) => (
          <div key={i} style={styles.bubble(msg.user === 'Puja')}>
            <div style={{ fontWeight: 'bold', fontSize: '0.7rem', marginBottom: '4px', opacity: 0.8 }}>{msg.user}</div>
            {msg.text}
            <div style={{ fontSize: '0.6rem', textAlign: 'right', marginTop: '4px', opacity: 0.6 }}>{msg.time}</div>
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input style={{ flex: 1, border: '1px solid #ddd', borderRadius: '12px', padding: '10px' }} 
          value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask Lumina AI..." />
        <button onClick={handleSend} style={{ background: '#646cff', color: 'white', border: 'none', borderRadius: '12px', padding: '10px 18px', cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;