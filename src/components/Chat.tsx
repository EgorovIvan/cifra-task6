import * as React from "react";
import {useState, useEffect} from 'react';
import MessageInput from "./MessageInput.tsx";
import MessageList from "./MessageList.tsx";
import {Actions} from "../pages/Home.tsx";
import ModalAuth from "./ModalAuth.tsx";
import {useImmer} from "use-immer";
import {User} from "../pages/UserManagement.tsx";
import {Draft} from "immer";

export interface Message {
  sender: string;
  message: string;
}

export interface ChatData {
  username: string,
  password: string,
  message: string,
  authStatus: boolean | null
}

interface Props {
  actions: Actions;
  updateActionsUser: (p: (draft: Draft<any>) => void) => void;
}

const Chat: React.FC<Props> = (Props) => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  // const [username, setUsername] = useState<string>('')
  // const [password, setPassword] = useState<string>('')
  // const [message, setMessage] = useState<string>('')
  const [chatLog, setChatLog] = useState<Message[]>([])
  // const [authStatus, setAuthStatus] = useState<boolean | null>(null)

  const [chatData, updateChatData] = useImmer<ChatData>({
    username: '',
    password: '',
    message: '',
    authStatus: null
  });


  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setWs(socket)

    socket.onmessage = (event): void => {
      const data = JSON.parse(event.data)

      if (data.type === 'auth') {

        updateChatData((draft: Draft<ChatData>): void => {
          draft.authStatus = data.success
        })

        if(data.success) {
          Props.updateActionsUser((draft): void=> {
            draft.auth = false
            draft.status = true
          })
        }
      } else if (data.type === 'message') {

        setChatLog((prevLog) => [...prevLog, data]);

      } else if (data.type === 'register') {

        if (data.success) {

          alert('Регистрация успешна!')

          Props.updateActionsUser((draft): void => {
            draft.register = false
            draft.status = true
          })

        } else {
          alert(`Ошибка регистрации: ${data.error}`)
        }
      }


    };

    return () => socket.close()
  }, [])

  /* Получить имя из формы */
  const getName = (username: string): void => {

    updateChatData((draft: Draft<ChatData>): void => {
      draft.username = username
    })

  }

  /* Получить пароль из формы */
  const getPassword = (password: string): void => {

    updateChatData((draft: Draft<ChatData>): void => {
      draft.password = password
    })

  }

  /* Получить пароль из формы */
  const getMessage = (message: string): void => {

    updateChatData((draft: Draft<ChatData>): void => {
      draft.message = message
    })

  }

  /* Авторизация */
  const sendAuth = (): void => {
    if (ws) {
      let username: string = chatData.username;
      let password: string = chatData.password;
      ws.send(
        JSON.stringify({
          type: 'auth',
          username,
          password,
        })
      )
    }
  }

  /* Закрыть модальное окно авторизации */
  const handleCloseModalAuth = (): void => {
    Props.updateActionsUser((draft): void => {
      draft.auth = false
    })
  }

  /* Закрыть модальное окно регистрации */
  const handleCloseModalRegister = (): void => {
    Props.updateActionsUser((draft): void => {
      draft.register = false
    })
  }

  /* Регистрация */
  const sendRegister = (): void => {

    if (ws) {
      let username: string = chatData.username;
      let password: string = chatData.password;
      ws.send(
        JSON.stringify({
          type: 'register',
          username,
          password,
        })
      )
    }

  }

  /* Отправить сообщение */
  const sendMessage = (): void => {
    console.log(chatLog)

    if (ws) {
      let message: string = chatData.message;
      ws.send(
        JSON.stringify({
          type: 'message',
          message,
        })
      )

      updateChatData((draft: Draft<ChatData>): void => {
        draft.message = ''
      })
    }

  }


  return (
    <div>

      {(chatData.authStatus === null && Props.actions.auth) ?
        <ModalAuth
          title="Авторизация"
          textBtn="Войти"
          chatData={chatData}
          getName={getName}
          getPassword={getPassword}
          send={sendAuth}
          closeModal={handleCloseModalAuth}
         /> : ''}

      {(chatData.authStatus === null && Props.actions.register) ?
        <ModalAuth
          title="Регистрация"
          textBtn="зарегистрироваться"
          chatData={chatData}
          getName={getName}
          getPassword={getPassword}
          send={sendRegister}
          closeModal={handleCloseModalRegister}
        /> : ''}

      {(chatData.authStatus && Props.actions.messengerShow) ?
        <div className='chat'>
          <div className='chat__header'>
            Chat Application
          </div>
          <div className='chat__body'>
            <MessageList username={chatData.username} chatLog={chatLog}/>
          </div>
          <div className='chat__footer'>

            <MessageInput message={chatData.message} getMessage={getMessage} onSend={sendMessage}/>
          </div>
        </div> : ''
      }
    </div>
  );
};

export default Chat;
