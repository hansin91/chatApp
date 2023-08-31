import { useEffect, useState } from "react"
import { Row, Col, Button, Form } from "react-bootstrap"
import { useParams } from 'react-router-dom';

function ChatRoom({ socket }: any) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([]) as any
  let { id } = useParams();

  const sendMessage = (e: any) => {
    e.preventDefault()
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId : id,
        // message: messageRef.current.value,
        message
      });
      // setMessage('')
      // messageRef.current.value = "";
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message: string) => {
        console.log('new message: ', message)
        const newMessages = [...messages, message]
        setMessages(newMessages)
      });
    }
  },[messages])

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId: id
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId: id
        });
      }
    };
    //eslint-disable-next-line
  }, [socket]);

  return (
    <Row>
      <Col md={12} xs={12}>
        {socket && 
        <Form onSubmit={sendMessage}>
          <Form.Group controlId="username">
            <Form.Control type="text" placeholder="Message" defaultValue={message} onChange={(e) => setMessage(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
        }
      </Col>
    </Row>
  )
}

export default ChatRoom