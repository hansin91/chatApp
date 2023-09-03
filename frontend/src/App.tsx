import React from 'react';
import { Container } from 'react-bootstrap';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.scss';
import LoginForm from './pages/Login';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import './index.scss'

function App() {
  const router = createBrowserRouter([
    {
      path: "/room/:id",
      element: <ChatRoom />
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
