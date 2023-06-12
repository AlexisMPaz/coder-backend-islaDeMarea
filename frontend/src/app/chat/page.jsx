"use client"
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatPage = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("messagesUpdated", (updatedMessages) => {
      setChatMessages(updatedMessages);
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
          setChatMessages(data.messages);
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
        body: JSON.stringify({ message: newChatMessage }),
        credentials: 'include',
      });

      if (response.ok) {
        setNewChatMessage('');
      } else {
        const data = await response.json();
        setAlertMessage(data.message);
      }
    } catch (error) {
      setMessage("No se ha podido conectar al chat, recuerda que tienes que estar logeado y no ser Admin");
    }
  };

  return (
    <div className="container mainContainer">
      {alertMessage && <div className="alert alert-danger" style={{ maxWidth: '500px', margin: '2rem auto' }}>{alertMessage}</div>}
      <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
        {chatMessages.map((chatMessage) => (
            <div key={chatMessage._id}>{chatMessage.user} ({chatMessage.email}): {chatMessage.message}</div>
        ))}
      </div>
      <input type="text" value={newChatMessage} onChange={(e) => setNewChatMessage(e.target.value)}/>
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
};

export default ChatPage;