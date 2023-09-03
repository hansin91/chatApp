import React from 'react';
import { Form, InputGroup } from 'react-bootstrap'

import './Input.scss';

function Input({ setMessage, sendMessage, message }: any) {
  return (
    <Form className="mb-3" onSubmit={sendMessage}>
      <InputGroup size="lg">
        <Form.Control
          type= "text"
          className="message-input"
          placeholder="Message here.."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
        <div className="circle-container">
          <div className="circle">
            <div className="arrow"></div>
          </div>
        </div>
      </InputGroup>
    </Form> 
  )
}
export default Input