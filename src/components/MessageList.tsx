import * as React from 'react';
import {Message} from "./Chat.tsx";


interface Props {
  username: string;
  chatLog: Message[];
}

const MessageList: React.FC<Props> = ({ chatLog, username }) => {
  return (
    <div className='message-list'>
      {chatLog.map((message, index) => (
        <div
          key={index}
          className={`message-list__item ${message.sender === username ? 'user' : ''}`}
        >
          {message.sender + ': ' + message.message}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
