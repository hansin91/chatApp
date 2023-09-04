import React from 'react';

import './Message.scss';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { content, senderId, user }, loggedUser }: any) => {
  console.log(senderId)
  let isSentByCurrentUser = false;

  if(loggedUser.id === (typeof(senderId) === 'string' ? senderId: senderId._id)) {
    isSentByCurrentUser = true;
  }

  return(
    <div className={`messageContainer mb-4 d-flex ${!isSentByCurrentUser ? `flex-column justify-content-start`: `flex-row justify-content-end`}`}>
      {!isSentByCurrentUser &&  <p className="sentText mb-0">{user ? user : senderId?.username}</p>}
      <div className={`messageBox ${isSentByCurrentUser ? `backgroundGreen` : `backgroundLight`}`}>
        <p className={`messageText ${isSentByCurrentUser ? `colorWhite` : `colorDark`}`}>{ReactEmoji.emojify(content)}</p>
      </div>
    </div>
  )
}

export default Message;