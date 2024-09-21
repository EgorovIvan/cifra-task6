import {WebSocket} from 'ws';
import { readFileSync, writeFileSync } from 'fs';

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });
let clients: { [key: string]: WebSocket } = {};
let users: { [key: string]: { password: string } } = {};

// Загружаем пользователей из файла
try {
  const data = readFileSync('users.json', 'utf8');
  users = JSON.parse(data);
} catch (err) {
  console.error('Ошибка при загрузке пользователей:', err);
}

// Функция для сохранения пользователей в файл
const saveUsers = () => {
  writeFileSync('users.json', JSON.stringify(users, null, 2));
};

wss.on('connection', (ws: WebSocket) => {
  let username: string | null = null;

  ws.on('message', (data: WebSocket.RawData) => {
    const message = JSON.parse(data.toString());
    console.log(message)
    switch (message.type) {
      case 'register':
        const { username: newUsername, password: newPassword } = message;
        if (users[newUsername]) {
          ws.send(
            JSON.stringify({
              type: 'register',
              success: false,
              error: 'Username already exists',
            })
          );
        } else {
          users[newUsername] = { password: newPassword };
          saveUsers();
          ws.send(
            JSON.stringify({
              type: 'register',
              success: true,
            })
          );
        }
        break;

      case 'auth':
        const { username: authUsername, password: authPassword } = message;
        if (users[authUsername] && users[authUsername].password === authPassword) {
          username = authUsername;
          clients[username] = ws;
          ws.send(
            JSON.stringify({
              type: 'auth',
              success: true,
            })
          );
        } else {
          ws.send(
            JSON.stringify({
              type: 'auth',
              success: false,
            })
          );
        }
        break;

      case 'message':
        if (username) {
          const broadcastMessage = {
            type: 'message',
            sender: username,
            message: message.message,
          };
          for (const client in clients) {
            clients[client].send(JSON.stringify(broadcastMessage));
          }
        }
        break;
    }
  });

  ws.on('close', () => {
    if (username && clients[username]) {
      delete clients[username];
    }
  });
});

console.log(`WebSocket сервер запущен на порту ${PORT}`);
