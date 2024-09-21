import * as React from "react";
import { useState, useEffect, useRef } from 'react';

const Chat: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [authStatus, setAuthStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setWs(socket);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'auth') {
        setAuthStatus(data.success);
      } else if (data.type === 'message') {
        setChatLog((prevLog) => [...prevLog, `${data.sender}: ${data.message}`]);
      } else if (data.type === 'register') {
        if (data.success) {
          alert('Регистрация успешна!');
        } else {
          alert(`Ошибка регистрации: ${data.error}`);
        }
      }
    };

    return () => socket.close();
  }, []);

  const sendAuth = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: 'auth',
          username,
          password,
        })
      );
    }
  };

  const sendRegister = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: 'register',
          username,
          password,
        })
      );
    }
  };

  const sendMessage = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: 'message',
          message,
        })
      );
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Чат</h1>
      {authStatus === null && (
        <div>
          <h2>Авторизация / Регистрация</h2>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={sendAuth}>Войти</button>
          <button onClick={sendRegister}>Зарегистрироваться</button>
        </div>
      )}
      {authStatus && (
        <div>
          <h2>Чат</h2>
          <div>
            {chatLog.map((msg, idx) => (
              <div key={idx}>{msg}</div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Отправить</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
