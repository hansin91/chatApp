import React, { useState } from 'react'
import { Row, InputGroup, Col, Form, Button } from 'react-bootstrap'
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
      <div style={{width: '25%'}}>
        <Row>
          <Col md={12} xs={12}>
            <Form onSubmit={joinRoom}>
              <h3 style={{marginBottom: '3rem'}}>Join Chatroom</h3>
               <InputGroup size="lg" style={{marginBottom: '1rem'}}>
                <Form.Control
                  type= "text"
                  style={{backgroundColor: '#F6f6F6'}}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
              
              <InputGroup size="lg">
                <Form.Control
                  type= "text"
                  style={{backgroundColor: '#F6f6F6'}}
                  placeholder="Room ID"
                  onChange={(e) => setRooomId(e.target.value)}
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
              <div className="d-grid gap-2" style={{marginTop: '7rem'}}>
                <Button style={{backgroundColor: '#5DB075', borderColor: '#5DB075', borderRadius: '30px'}}
                  type="submit" 
                  variant="primary" size="lg">Join</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LoginForm