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
    show_modal_remove: false,
  })

  // возможно лишние стейты
  const [userData, updateUserData] = useImmer<User>({id: "", name: "", email: "", phone: ""});
  const [editUserData, updateEditUserData] = useImmer<User | undefined>({id: "", name: "", email: "", phone: ""});
  const [removeUserData, updateRemoveUserData] = useImmer<User>({id: "", name: "", email: "", phone: ""});

  /* GET - запрос */
  const fetchUsersData = async () => {

    try {

      const response: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/users');

      const responseData: UserApi = response.data;

      const initialUsersList = []

      for (let item of responseData) {

        const obj: User = {
          id: item.id.toString(),
          name: item.name,
          email: item.email,
          phone: item.phone,
        }

        initialUsersList.push(obj)
      }

      updateUsers((draft): void => {
        draft.push(...initialUsersList)
      })

      localStorage.setItem('users', JSON.stringify(initialUsersList))

    } catch (error) {

      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors

        console.error("Axios error:", error.message);
      } else {
        // Handle general errors

        console.error("General error:", error.message);
      }
    }
  };

  /* Открыть форму добавления пользователя */
  const handleOpenModalAddUser = (): void => {

    updateShowModal((draft): void => {
      draft.show_modal_add = true
    })

    /* генерация id */
    updateUserData((draft): void => {
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
  const getName = (name): void => {

    updateUserData((draft): void => {
      draft.name = name
    })

  }

  /* Получить email нового пользователя из формы */
  const getEmail = (email): void => {

    updateUserData((draft) => {
      draft.email = email
    })

  }

  /* Получить номер телефона нового пользователя из формы */
  const getPhone = (phone): void => {

    updateUserData((draft): void => {
      draft.phone = phone
    })

  }

  /* Добавить нового пользователя */
  const addUser = (): void => {

    updateUsers((draft): void => {
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

    const find = users.find((item) => item.id === id)

    if (find) {

      updateEditUserData((draft): void => {
        if (draft) {
          draft.id = find.id
          draft.name = find.name
          draft.email = find.email
          draft.phone = find.phone
        }
      })

      updateUserData((draft): void => {
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

    const findIndex: number = users.findIndex((obj) => obj.id === id)

    updateUsers((draft): void => {
      draft.splice(findIndex, 1, userData)
    })

    // let localArray = [...users] - не помогло
    /* В зависимости от вашей ситуации вы можете сделать глубокую копию, чтобы удалить ссылку на хранилище. */
    let localArray = JSON.parse(JSON.stringify(users));

    localArray.map((obj) => {

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

    const find = users.find((item) => item.id === id)

    /* Заполнить state всеми данными для мягкого удаления*/
    if (find) {

      updateRemoveUserData((draft): void => {
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

    const findIndex: number = users.findIndex((obj) => obj.id === id)

    updateUsers((draft): void => {
      draft.splice(findIndex, 1)
    })

    let localArray: User[] = JSON.parse(JSON.stringify(users)).filter(obj => obj.id !== id);

    localStorage.setItem('users', JSON.stringify([...localArray]))

    updateShowModal((draft): void => {
      draft.show_modal_remove = false
    })
  }

  useEffect((): void => {
    if (localStorage.getItem('users')) {

      // let usersArray: User[] = []
      //
      // usersArray =
    console.log(JSON.parse(localStorage.getItem('users')))

      updateUsers((draft): void => {
        // очистка массива
        // draft.splice(0, users.length)
        // заполнение массива
        draft.push(...JSON.parse(localStorage.getItem('users')))
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
  console.log(users)
  return (
    <>
      <Header/>
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
