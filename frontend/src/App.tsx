import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import io from "socket.io-client";
import './App.scss';
import LoginForm from './pages/Login';
import ChatRoom from './pages/ChatRoom';

function App() {

  const [socket, setSocket] = useState(null) as any
  const setupSocket = () => {
    if (!socket) {
      const newSocket = io("http://localhost:4000", { withCredentials: true});
      setSocket(newSocket)
      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);  
      });
    }
  };

  useEffect(() => {
    setupSocket();
    return () => {setSocket(null)};
    //eslint-disable-next-line
  }, []);

  const router = createBrowserRouter([
    {
      path: "/room/:id",
      element: <ChatRoom socket={socket} />
    },
    {
      path: "/",
      element: <LoginForm />,
    },
  ]);

  return (
    <div className="App">
       <Container fluid>
        <RouterProvider router={router} />
       </Container>
    </div>
  );
}

export default App;
