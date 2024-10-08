import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import {useImmer} from "use-immer";
import ModalUser from "../components/ModalUser.tsx";
import UsersList from "../components/UsersList.tsx";
import Button from "../components/Button.tsx";
import {v4 as uuid} from 'uuid';
import {useEffect} from "react";
import axios, {AxiosResponse} from 'axios';
import ModalConfirm from "../components/ModalConfirm.tsx";
import {Draft} from "immer";
import {Actions} from "./Home.tsx";
import Chat from "../components/Chat.tsx";

interface UserApi {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    "street": string,
    "suite": string,
    "city": string,
    "zipcode": string,
    "geo": {
      "lat": string,
      "lng": string
    }
  },
  "phone": string,
  "website": string,
  "company": {
    "name": string,
    "catchPhrase": string,
    "bs": string
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const UserManagement: React.FC = () => {

  const [users, updateUsers] = useImmer([])
  const [showModal, updateShowModal] = useImmer({
    show_modal_add: false,
    show_modal_edit: false,
    show_modal_remove: false
  })

  const [userData, updateUserData] = useImmer<User>({id: "", name: "", email: "", phone: ""});
  const [editUserData, updateEditUserData] = useImmer<User | undefined>({id: "", name: "", email: "", phone: ""});
  const [removeUserData, updateRemoveUserData] = useImmer<User>({id: "", name: "", email: "", phone: ""});

  /* actions для чата */
  const [actionsUser, updateActionsUser] = useImmer<Actions>({
    status: false,
    auth: false,
    register: false,
    messengerShow: false
  });

  /* GET - запрос */
  const fetchUsersData = async () => {

    try {

      const response: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/users');

      const responseData: UserApi[] = response.data;

      const initialUsersList: any[] = []

      for (let item of responseData) {

        const obj: any = {
          id: item.id.toString(),
          name: item.name,
          email: item.email,
          phone: item.phone,
        }

        initialUsersList.push(obj)
      }

      updateUsers((draft: Draft<User[]>): void => {
        draft.push(...initialUsersList)
      })

      localStorage.setItem('users', JSON.stringify(initialUsersList))

    } catch (error) {

      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors

        console.error("Axios error:", (error as Error).message);
      } else {
        // Handle general errors

        console.error("General error:", (error as Error).message);
      }
    }
  };

  /* Открыть форму добавления пользователя */
  const handleOpenModalAddUser = (): void => {

    updateShowModal((draft): void => {
      draft.show_modal_add = true
    })

    /* генерация id */
    updateUserData((draft: Draft<User>): void => {
      draft.id = uuid()
    })

  }

  /* Закрыть форму добавления пользователя */
  const handleCloseModalAddUser = (): void => {

    updateShowModal((draft): void => {
      draft.show_modal_add = false
    })

  }

  /* Получить имя нового пользователя из формы */
  const getName = (name: string): void => {

    updateUserData((draft): void => {
      draft.name = name
    })

  }

  /* Получить email нового пользователя из формы */
  const getEmail = (email: string): void => {

    updateUserData((draft) => {
      draft.email = email
    })

  }

  /* Получить номер телефона нового пользователя из формы */
  const getPhone = (phone: string): void => {

    updateUserData((draft: Draft<User>): void => {
      draft.phone = phone
    })

  }

  /* Добавить нового пользователя */
  const addUser = (): void => {

    updateUsers((draft: Draft<User[]>): void => {
      draft.push(userData)
    })

    localStorage.setItem('users', JSON.stringify([...users, userData]))

    /* закрытие модального окна */
    updateShowModal((draft): void => {
      draft.show_modal_add = false
    })

  }

  /* Открыть форму изменения данных пользователя */
  const handleOpenModalEditUser = (id: string): void => {

    updateShowModal((draft): void => {
      draft.show_modal_edit = true
    })

    const find: any = users.find((item: any) => item.id === id)

    if (find) {

      updateEditUserData((draft: Draft<any>): void => {
        if (draft) {
          draft.id = find.id
          draft.name = find.name
          draft.email = find.email
          draft.phone = find.phone
        }
      })

      updateUserData((draft: Draft<any>): void => {
        draft.id = find.id
        draft.name = find.name
        draft.email = find.email
        draft.phone = find.phone
      })

    } else {
      alert("Ошибка в данных")
    }
  }

  /* Закрыть форму изменения данных пользователя */
  const handleCloseModalEditUser = (): void => {

    updateShowModal((draft): void => {
      draft.show_modal_edit = false
    })

  }

  const editUser = (id: string): void => {

    const findIndex: number = users.findIndex((obj: any) => obj.id === id)

    updateUsers((draft: Draft<User[]>): void => {
      draft.splice(findIndex, 1, userData)
    })

    // let localArray = [...users] - не помогло
    /* В зависимости от вашей ситуации вы можете сделать глубокую копию, чтобы удалить ссылку на хранилище. */
    let localArray = JSON.parse(JSON.stringify(users));

    localArray.map((obj: any): void => {

      // return Object.assign(user, modalUser.value);
      if (obj.id === id) {
        obj.name = userData.name
        obj.email = userData.email
        obj.phone = userData.phone
      }
    })

    localStorage.setItem('users', JSON.stringify([...localArray]))

    updateShowModal((draft): void => {
      draft.show_modal_edit = false
    })

  }

  /* Открыть форму удаления данных пользователя */
  const handleOpenModalRemoveUser = (id: string): void => {

    updateShowModal((draft): void => {
      draft.show_modal_remove = true
    })

    const find: any = users.find((item: any) => item.id === id)

    /* Заполнить state всеми данными для мягкого удаления*/
    if (find) {

      updateRemoveUserData((draft: Draft<any>): void => {
        draft.id = find.id
        draft.name = find.name
        draft.email = find.email
        draft.phone = find.phone
      })
    } else {
      alert("Ошибка в данных")
    }
  }

  /* Закрыть форму удаления данных пользователя */
  const handleCloseModalRemoveUser = (): void => {

    updateShowModal((draft): void => {
      draft.show_modal_remove = false
    })

  }

  /* Удаление пользователя */
  const removeUser = (id: string): void => {

    const findIndex: number = users.findIndex((obj: any) => obj.id === id)

    updateUsers((draft): void => {
      draft.splice(findIndex, 1)
    })

    let localArray: User[] = JSON.parse(JSON.stringify(users)).filter((obj: any) => obj.id !== id);

    localStorage.setItem('users', JSON.stringify([...localArray]))

    updateShowModal((draft): void => {
      draft.show_modal_remove = false
    })
  }

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

  useEffect((): void => {
    if (localStorage.getItem('users')) {

      let usersArray: User[] = JSON.parse(localStorage.getItem('users')!)

      updateUsers((draft:Draft<User[]>): void => {
        // очистка массива
        draft.splice(0, users.length)
        // заполнение массива
        draft.push(...usersArray)
      })
    } else {

      fetchUsersData().then(() =>
        console.log("Данные загружены")
      ).catch(
        e => {
          console.log(e.message)
        }
      );
    }

  }, []);

  return (
    <>
      <Header
        status={actionsUser.status}
        showModalAuth={showModalAuth}
        showModalRegister={showModalRegister}
      />
      <main className="management">
        <div className="container">
          <Button
            type="button"
            classBtn="management__btn-add-user"
            text="Создать нового пользователя"
            onClickBtn={() => handleOpenModalAddUser()}
          />

          <UsersList
            users={users}
            handleOpenModal={handleOpenModalEditUser}
            handleOpenModalConfirm={handleOpenModalRemoveUser}
          />
        </div>

        <Chat actions={actionsUser} updateActionsUser={updateActionsUser}/>
        {actionsUser.status ? <div className="chat-btn" onClick={showModalMessenger} ></div> : ''}
      </main>
      <Footer/>

      {showModal.show_modal_add ?
        <ModalUser
          title="Добавление нового пользователя"
          textBtn="Добавить"
          getName={getName}
          getEmail={getEmail}
          getPhone={getPhone}
          actionUser={addUser}
          handleCloseModal={handleCloseModalAddUser}
        /> : ''}

      {showModal.show_modal_edit ?
        <ModalUser
          title="Редактирование данных"
          textBtn="Изменить"
          editUserData={editUserData}
          getName={getName}
          getEmail={getEmail}
          getPhone={getPhone}
          actionUser={editUser}
          handleCloseModal={handleCloseModalEditUser}
        /> : ''}

      {showModal.show_modal_remove ?
        <ModalConfirm
          removeUserData={removeUserData}
          actionRemove={removeUser}
          handleCloseModal={handleCloseModalRemoveUser}
        /> : ''}
    </>
  )
}

export default UserManagement
