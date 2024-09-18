import * as React from "react";
import UserItem from "./UserItem.tsx";
import {User} from "../pages/UserManagement.tsx";

interface Props {
  users: User[];
  handleOpenModal: (id: string) => void;
  handleOpenModalConfirm: (id: string) => void;
}

const UsersList: React.FC<Props> = (Props) => {

  return (
    <>
      <div className="management__header">
        <div className="management__header-item">Пользователь</div>
        <div className="management__header-item">Email</div>
        <div className="management__header-item">Phone</div>
        <div className="management__header-item">Изменить</div>
        <div className="management__header-item">Удалить</div>
      </div>

      <ul className="management__list">
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
