import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import api from '../api'

function LoginForm() {

  const [username, setUsername] = useState('')
  const [roomId, setRooomId] = useState('')
  const navigate = useNavigate()

  const joinRoom = async (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    const { data: {room} } = await api.post('rooms/join', {username, name: roomId}, {
      withCredentials: true
    })
    navigate(`/room/${room._id}`);
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Row>
        <Col md={12} xs={12}>
          <Form onSubmit={joinRoom}>
            <h3>Join Chatroom</h3>
            <Form.Group controlId="username">
              <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="roomId">
              <Form.Control type="text" placeholder="RoomID" onChange={(e) => setRooomId(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Join
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default LoginForm