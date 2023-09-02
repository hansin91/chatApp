import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.scss';

const Messages = ({ messages, name }: any) => (
  <ScrollToBottom className="messages">
    {messages.map((message: any, i: number) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;