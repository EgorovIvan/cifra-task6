import * as React from "react";
import {User} from "../pages/UserManagement.tsx";

interface Props {
  item: User;
  handleOpenModal: (id: string) => void;
  handleOpenModalConfirm: (id: string) => void;
}

const UserItem: React.FC<Props> = ({item, handleOpenModal, handleOpenModalConfirm}: Props) => {

  return (
    <li className="management__row">
      <div className="management__row-item">{item.name}</div>
      <div className="management__row-item">{item.email}</div>
      <div className="management__row-item">{item.phone}</div>
      <div className="management__row-item">
        <div className="management__row-img-edit" onClick={() => handleOpenModal(item.id)}></div>
      </div>
      <div className="management__row-item">
        <div className="management__row-img-remove" onClick={() => handleOpenModalConfirm(item.id)}></div>
      </div>
    </li>
  )
}

export default UserItem
