import React, { useState } from 'react'
import { Row, InputGroup, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import api from '../../api'

import './Login.scss'

function LoginForm() {

  const [username, setUsername] = useState('')
  const [error, setError] = useState<any>({})
  const [roomId, setRooomId] = useState('')
  const navigate = useNavigate()

  const joinRoom = async (e: React.ChangeEvent<any>) => {
    try {
      e.preventDefault()
      const { data: {room} } = await api.post('rooms/join', {username, name: roomId}, {
        withCredentials: true
      })
      setError({})
      navigate(`/room/${room._id}`);
    } catch (error: any) {
      const {response: {data}} = error
      setError({'login': data.message})
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div style={{width: '25%'}}>
        <Row>
          <Col md={12} xs={12}>
            <Form onSubmit={joinRoom}>
              <h3 style={{marginBottom: '3rem'}}>Join Chatroom</h3>
              {Object.keys(error).length > 0 && error['login'] && <p style={{color: 'red'}}>{error['login']}</p> }
               <InputGroup size="lg" style={{marginBottom: '1rem'}}>
                <Form.Control
                  type= "text"
                  placeholder="Username"
                  className="join-form-input"
                  onChange={(e) => setUsername(e.target.value)}
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
              
              <InputGroup size="lg">
                <Form.Control
                  type= "text"
                  placeholder="Room ID"
                  className="join-form-input"
                  onChange={(e) => setRooomId(e.target.value)}
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
              <div className="d-grid gap-2" style={{marginTop: '7rem'}}>
                <Button style={{backgroundColor: '#5DB075', borderColor: '#5DB075', borderRadius: '30px'}}
                  type="submit"
                  disabled={!username || !roomId} 
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