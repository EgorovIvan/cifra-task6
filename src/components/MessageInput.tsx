import * as React from 'react';

interface MessageInputProps {
  message: string;
  getMessage: (message: string) => void;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = (Props) => {

  return (
    <div className='message-input'>
      <input
        type="text"
        value={Props.message}
        onChange={(e) => Props.getMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={Props.onSend} disabled={!Props.message.trim()}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
