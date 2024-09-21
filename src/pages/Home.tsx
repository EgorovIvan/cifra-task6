import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Chat from "../components/Chat.tsx";
import {useImmer} from "use-immer";
import {Draft} from "immer";

export interface Actions {
  status: boolean;
  auth: boolean;
  register: boolean;
  messengerShow: boolean;
}

const Home: React.FC = () => {
  const [actionsUser, updateActionsUser] = useImmer<Actions>({
    status: false,
    auth: false,
    register: false,
    messengerShow: false
  });

  /* Открыть окно авторизации */
  const showModalAuth = (): void => {

    updateActionsUser((draft: Draft<Actions>): void => {
      draft.auth = true
    })

  }

  /* Открыть окно регистрации */
  const showModalRegister = (): void => {

    updateActionsUser((draft: Draft<Actions>): void => {
      draft.register = true
    })

  }

  /* Открыть окно чата */
  const showModalMessenger = (): void => {

    updateActionsUser((draft: Draft<Actions>): void => {
      draft.messengerShow = !draft.messengerShow
    })

  }

  return (
    <>
      <Header
        status={actionsUser.status}
        showModalAuth={showModalAuth}
        showModalRegister={showModalRegister}
      />
      <main className="main">
        <div className="container">
          <h1 className="main__title">My APP</h1>
        </div>
        <Chat actions={actionsUser} updateActionsUser={updateActionsUser}/>
        {actionsUser.status ? <div className="chat-btn" onClick={showModalMessenger} ></div> : ''}
      </main>
      <Footer/>
    </>
  )
}

export default Home
