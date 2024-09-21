import * as React from "react";
import UserItem from "./UserItem.tsx";
import {User} from "../pages/UserManagement.tsx";
import {useEffect, useState} from "react";

interface Props {
  users: User[];
  handleOpenModal: (id: string) => void;
  handleOpenModalConfirm: (id: string) => void;
}

const UsersList: React.FC<Props> = (Props) => {

  const [showAnimation, setShowAnimation] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setShowAnimation(true));
  }, []);
  return (
    <>
      <div className={`management__header ${showAnimation ? "management__show" : ""}`}>
        <div className="management__header-item">Пользователь</div>
        <div className="management__header-item">Email</div>
        <div className="management__header-item">Phone</div>
        <div className="management__header-item">Изменить</div>
        <div className="management__header-item">Удалить</div>
      </div>
      <ul className={`management__list ${showAnimation ? "management__show" : ""}`}>
        {Props.users.map((item, index) => (
          <UserItem
            key={item.name + index}
            item={item}
            handleOpenModal={Props.handleOpenModal}
            handleOpenModalConfirm={Props.handleOpenModalConfirm}
          />
        ))}
      </ul>

    </>
  )
}

export default UsersList
