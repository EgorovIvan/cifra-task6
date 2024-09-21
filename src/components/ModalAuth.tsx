import Button from "./Button.tsx";
import * as React from "react";
import Input from "./Input.tsx";
import {User} from "../pages/UserManagement.tsx";
import {Draft} from "immer";
import {ChatData} from "./Chat.tsx";


interface Props {
  title: string;
  textBtn: string;
  chatData: ChatData;
  getName: (username:string) => void;
  getPassword: (password:string) => void;
  send: () => void;
  closeModal: () => void;
}

const ModalAuth: React.FC<Props> = (Props) => {

  return (
    <>
      <div className="modal-user" id="modal-user">

        <form className="modal-user__form" action="" id="form">
          <div className="modal-user__close" onClick={Props.closeModal}></div>

          <h3 className="modal-user__title">{Props.title}</h3>

          <Input
            type="text"
            classInp="input-box__field"
            name="user"
            placeholder="Имя пользователя"
            inputValue={Props.chatData.username}
            updateValue={Props.getName}
          />

          <Input
            type="text"
            classInp="input-box__field"
            name="password"
            placeholder="Пароль"
            inputValue={Props.chatData.password}
            updateValue={Props.getPassword}
          />

          <Button
            type="button"
            classBtn="modal-user__btn"
            text={Props.textBtn}
            onClickBtn={Props.send}
          />

        </form>
      </div>
    </>
  )
}

export default ModalAuth
