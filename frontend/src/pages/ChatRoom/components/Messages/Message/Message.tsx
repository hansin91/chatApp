import React from 'react';

import './Message.scss';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }: any) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return(
    <div className={`messageContainer mb-4 d-flex ${!isSentByCurrentUser ? `flex-column justify-content-start`: `flex-row justify-content-end`}`}>
      {!isSentByCurrentUser &&  <p className="sentText mb-0">{user}</p>}
      <div className={`messageBox ${isSentByCurrentUser ? `backgroundGreen` : `backgroundLight`}`}>
        <p className={`messageText ${isSentByCurrentUser ? `colorWhite` : `colorDark`}`}>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  )
}

export default Message;