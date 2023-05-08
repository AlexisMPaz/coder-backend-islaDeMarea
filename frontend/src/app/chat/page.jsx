"use client"
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("messagesUpdated", (updatedMessages) => {
      setMessages(updatedMessages);
    });

    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/chat', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Origin: 'http://localhost:3000',
          },
          credentials: 'include',
        });
        const data = await response.json();
        if(data.messages) {
          setMessages(data.messages);
        } else {
          setAlertMessage("Necesitas estar logeado para chatear")
        }
      } catch (error) {
        setAlertMessage("No se pudo conectar con el servidor, intente mas tarde")
        console.error('Error al cargar los mensajes:', error);
      }
    };

    fetchMessages();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'http://localhost:3000',
        },
        body: JSON.stringify({ message: newMessage }),
        credentials: 'include',
      });

      if (response.ok) {
        setNewMessage('');
      } else {
        const data = await response.json();
        setAlertMessage(data.message);
      }
    } catch (error) {
      setAlertMessage("No se ha podido conectar al chat, recuerda que tienes que estar logeado y no ser Admin");
    }
  };

  return (
    <div className="container mainContainer">
      {alertMessage && <div className="alert alert-danger" style={{ maxWidth: '500px', margin: '2rem auto' }}>{alertMessage}</div>}
      <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
        {messages.map((message) => (
            <div key={message._id}>{message.user} ({message.email}): {message.message}</div>
        ))}
      </div>
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
};

export default ChatPage;