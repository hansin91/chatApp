import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useLocation, useParams } from 'react-router-dom';

import Messages from './components/Messages/Messages';
import InfoBar from './components/InfoBar/InfoBar';
import Input from './components/Input/Input';
import api from '../../api'

import './Chat.scss';

const ENDPOINT = process.env.REACT_APP_BASE_URL as string

interface User {
  id: string
  username: string
}

const ChatRoom = () => {
  const [user, setUser] = useState<User | null>(null)
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]) as any
  const [socket] = useState(io(ENDPOINT, { withCredentials: true}))
  const location = useLocation()
  const { id } = useParams()
  const effectRan = useRef(false)

  useEffect(() => {
    const getRoomAndUser = async () => {
      const {data: {room}} = await api.get(`rooms/${id}`, { withCredentials: true })
      const {data: {user}} = await api.get(`users/login`, { withCredentials: true })
      setRoom(room.name)
      setUser(user)
      socket.emit('join', { name: user.username, room: room.name }, (error: any) => {
        if(error) alert(error);
      });
    }

    if (!effectRan.current && socket) {
      getRoomAndUser()
    }

    socket.on('connect', () => {
      console.log('Connected to the Socket.IO server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the Socket.IO server');
      setTimeout(() => {
        socket.connect();
      }, 2000);
    });

    return () =>  {
      effectRan.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  
  useEffect(() => {
    if (!effectRan.current && socket) {
      socket.on('message', (message: string) => {
        setMessages((messages: Array<string>) => [ ...messages, message ]);
      });
      
      socket.on("roomData", ({ users }: any) => {
        setUsers(users);
      });
    }
    return () => {
      effectRan.current = true
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [messages]);

  const sendMessage = (event: any) => {
    event.preventDefault();
    if(message && room && user) {
      socket.emit('sendMessage', {message, name: user.username, room}, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          {user && <Messages messages={messages} name={user.username} />}
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatRoom;
